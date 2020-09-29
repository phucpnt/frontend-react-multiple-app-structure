import React, { Component } from 'react';
import './style.css';

const isLoggedIn = () => true;
const setLoggedIn = (status) => true

let URL_ACCESS_TOKEN = '/web/login/access-token';

if (process.env.NODE_ENV === 'production') {
  URL_ACCESS_TOKEN = '/login/access-token';
}

export function withAuthen(HocComponent) {
  return class Authen extends Component {
    constructor() {
      super();
      this.state = {
        isLoading: false,
      };
    }

    render() {
      const { isLoading } = this.state;
      return !isLoading ? <HocComponent {...this.props} isLoggedIn={isLoggedIn()} /> : null;
    }
  };
}

/**
 * Use:
 * import imgSource from './img.png';
 * <Authority isFull={false} title={'How are top themes impacting equities over last 30 days'} imgSource={imgSource}>
 * 		<YourComponent />
 * </Authority>
 *
 * OR
 * <Authority isDisabledOnClick disableClassName={classes.abc}>
 * 		<YourComponent />
 * </Authority>
 */

export class Authority extends React.Component {
  goToLogin = () => {
    window.location.href = '/login';
    return false;
  };

  render() {
    const {
      isFull = false,
      title = '',
      imgSource = false,
      isDisabledOnClick,
      disableClassName = '',
      isHidden,
      type = 'signin',
    } = this.props;

    if (isHidden && !isLoggedIn()) return null;

    // disabled on click
    if (isDisabledOnClick && !isLoggedIn()) {
      return (
        <div className={`AuthHOC-disable-click ${disableClassName}`} onClick={this.goToLogin}>
          {React.cloneElement(this.props.children, {
            isLoggedIn: isLoggedIn(),
          })}
        </div>
      );
    }

    // blur
    if (isFull && !isLoggedIn()) {
      if (type === 'contact')
        return (
          <div className="AuthHOC-container AuthHOC-container-contact">
            <img src={imgSource} alt={title} />
            <div className="AuthHOC-body">
              <div
                className="AuthHOC-title AuthHOC-title-contact"
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              ></div>
              <a className="AuthHOC-btn AuthHOC-btn-contact" href="/login">
                Contact us to subscribe
              </a>
            </div>
          </div>
        );
      return (
        <div className="AuthHOC-container">
          <img src={imgSource} alt={title} />
          <div className="AuthHOC-body">
            <div
              className="AuthHOC-title"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            ></div>
            <a className="AuthHOC-btn" href="/login">
              Sign in to unlock
            </a>
          </div>
        </div>
      );
    }

    // show full element
    return React.cloneElement(this.props.children, {
      isLoggedIn: isLoggedIn(),
    });
  }
}

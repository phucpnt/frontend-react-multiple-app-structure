import React from 'react';
import PropTypes from 'prop-types';
import injectStyle from 'react-jss';

class Dropdown extends React.Component {
  state = {
    focused: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside = event => {
    if (
      this.state.focused &&
      this.dropdownRef &&
      !this.dropdownRef.contains(event.target) &&
      document.body.contains(event.target)
    ) {
      this.setState({ focused: false });
      this.props.onHide();
    }
  };

  handleChange = () => {
    const { focused } = this.state;
    const { onlyHideClickOutside } = this.props;
    if (onlyHideClickOutside) {
      if (!focused) {
        this.setState({ focused: true });
      }
    } else {
      if (focused === false) {
        this.setState({ focused: true });
        this.props.onShow();
      } else {
        this.setState({ focused: false });
        this.props.onHide();
      }
    }
  };

  toggle(show = true) {
    this.setState({ focused: show });
  }

  render() {
    const { classes, className, classNameSelect, classNameDropbox, style, label, children } = this.props;
    const { focused } = this.state;
    let wrapperClass = [];
    let dropdownSelectClass = [];
    let dropdownCtClass = [];

    if (classes) {
      wrapperClass.push(classes.wrapper);
      dropdownSelectClass.push(classes.dropdownSelect);
      dropdownCtClass.push(classes.dropdownCt);
    }

    if (className) wrapperClass.push(className);
    if (classNameSelect) dropdownSelectClass = [classNameSelect];
    if (classNameDropbox) dropdownCtClass = [classNameDropbox];
    if (focused) dropdownSelectClass = dropdownSelectClass.concat('focused');

    return (
      <div style={style} className={wrapperClass.join(' ')} ref={node => (this.dropdownRef = node)}>
        <div className={dropdownSelectClass.join(' ')} onClick={this.handleChange}>
          {label} <i className="arrow" />
        </div>
        {focused && !!children && <div className={dropdownCtClass.join(' ')}>{children}</div>}
      </div>
    );
  }
}

const style = {
  wrapper: {
    position: 'relative',
  },
  dropdownSelect: {
    cursor: 'pointer',
    userSelect: 'none',
    height: '30px',
    borderRadius: '1px',
    border: 'solid 1px #ccc',
    backgroundColor: 'var(--white)',
    lineHeight: '30px',
    paddingLeft: '0.5rem',
    position: 'relative',
    transition: '100ms linear all',
    background: '#fff',
    fontSize: '12px',
    color: 'var(--black)',
    '& .arrow': {
      width: '0',
      height: '0',
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid #999',
      position: 'absolute',
      top: 'calc(50% - 2px)',
      right: '8px',
      transition: '200ms linear all',
    },
    '&.focused': {
      '& .arrow': {
        transform: 'rotate(-180deg)',
      },
    },
  },
  dropdownCt: {
    position: 'absolute',
    width: '100%',
    zIndex: 99,
    borderRadius: '2px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    border: 'solid 1px #ccc',
    backgroundColor: 'var(--white)',
    marginTop: '-1px',
    '& ul': {
      padding: '5px 0',
      '& li': {
        padding: '0.5rem',
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        userSelect: 'none',
        '&.active': {
          cursor: 'default',
          background: '#f4f4f4',
          color: 'var(--a1)',
        },
        '&:last-child': {
          borderBottom: 0,
        },
        '&:hover:not(.active)': {
          background: '#f4f4f4',
          color: 'var(--a1)',
        },
      },
    },
  },
};

Dropdown.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  classNameContainer: PropTypes.string,
  classNameSelect: PropTypes.string,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
};

Dropdown.defaultProps = {
  onHide: () => {},
  onShow: () => {},
};

// ⇣ ⇣ ⇣    injectStyle({})(Dropdown);
const DropdownUI = (Component => {
  return ({ innerRef, ...props }) => <Component ref={innerRef} {...props} />;
})(Dropdown);

export { DropdownUI as Dropdown };
export default injectStyle(style)(Dropdown);

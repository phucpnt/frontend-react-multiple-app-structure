import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectStyle } from "company/lib/jss";

import iconAngleDown from "shared/assets/angle-down.svg";

class DropdownUI extends React.Component {
  state = {
    focused: false,
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, false);
  }

  handleClickOutside = (event) => {
    if (this.state.focused && this.dropdownRef && !this.dropdownRef.contains(event.target)) {
      this.setState({ focused: false });
      this.props.onHide();
    }
  }

  handleChange = () => {
    const { focused } = this.state;
    if (focused === false) {
      this.setState({ focused: true });
      this.props.onShow();
    } else {
      this.setState({ focused: false });
      this.props.onHide();
    }
  }

  toggle(show = true){
    this.setState({focused: show});
  }

  render() {
    const {
      classes,
      className,
      classNameContainer,
      classNameSelect,
      style,
      label,
    } = this.props;
    const { focused } = this.state;

    const containerClass = [classes.container];
    if (className) containerClass.push(className);

    const dropdownSelectClass = [classes.dropdownSelect];
    if (focused) dropdownSelectClass.push("focused");
    if (classNameSelect) dropdownSelectClass.push(classNameSelect);
    const dropdownCtClass = [classes.dropdownCt];
    if (classNameContainer) dropdownCtClass.push(classNameContainer);

    return (
      <div
        className={containerClass.join(" ")}
        style={style}
        ref={(node) => { this.dropdownRef = node; }}
      >
        <div
          className={dropdownSelectClass.join(" ")}
          onClick={this.handleChange}
        >
          {label} <i className={classes.iconAngleDown} />
        </div>
        { focused &&
          <div className={dropdownCtClass.join(" ")}>
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}

const style = {
  container: {
    position: "relative",
  },
  dropdownSelect: {
    cursor: "pointer",
    WebkitTouchCallout: "none",
    IOSSafariWebkitUserSelect: "none",
    SafariKhtmlUserSelect: "none",
    KonquerorHTMLMozUserSelect: "none",
    FirefoxMsUserSelect: "none",
    InternetExplorerEdgeUserSelect: "none",
    height: "25px",
    lineHeight: "25px",
    borderRadius: "2px",
    border: "solid 1px #bbb",
    paddingLeft: "8px",
    fontSize: "12px",
    color: "var(--g2)",
    position: "relative",
    "&.focused": {
      color: "var(--n1)",
      border: "solid 1px #ccc",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  },
  iconAngleDown: {
    position: "absolute",
    display: "inline-block",
    background: `url(${iconAngleDown}) no-repeat`,
    width: "8px",
    height: "5px",
    right: "8px",
    top: "9px",
  },
  dropdownCt: {
    position: "absolute",
    width: "100%",
    zIndex: 99,
    borderRadius: "2px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
    border: "solid 1px #d1d1d1",
    backgroundColor: "var(--g4)",
  },
};

DropdownUI.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  label: PropTypes.string,
  className: PropTypes.string,
  classNameContainer: PropTypes.string,
  classNameSelect: PropTypes.string,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
};

DropdownUI.defaultProps = {
  onHide: () => {},
  onShow: () => {},
}

export const Dropdown = injectStyle(style)(DropdownUI);

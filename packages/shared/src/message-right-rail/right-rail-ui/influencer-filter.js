import React from 'react';
import injectStyle from 'react-jss';
import { FILTER_TYPE_LIST } from 'shared/lib/constant';
import { Dropdown } from './dropdown.next';
import style from './filter-style';

const label2Id = str =>
  str
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, '')
    .replace(/\s+/g, '-');

class EventFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFilterOriginal: props.currentFilter,
      type: props.currentFilter.type,
      category: props.currentFilter.category || [],
      oldFilter: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.currentFilter) !== JSON.stringify(prevState.currentFilterOriginal)) {
      return {
        currentFilterOriginal: nextProps.currentFilter,
        type: nextProps.currentFilter.type,
        category: nextProps.currentFilter.category || [],
        oldFilter: null,
      };
    }
    return null;
  }

  handleOptionChange = e => {
    // const fName = e.target.name;
    const value = e.target.value;
    // const category = this.state.category || [];

    if (parseInt(value) < 0) {
      this.setState({ type: value, category: [] });
    } else {
      this.setState({ type: -3, category: [value] });
    }
  };

  onDropdownHide = () => {
    const { oldFilter } = this.state;
    oldFilter &&
      this.setState({
        type: oldFilter.type,
        category: oldFilter.category,
        oldFilter: null,
      });
  };

  onDropdownShow = () => {
    const { type, category } = this.state;
    this.setState({
      oldFilter: { type, category },
    });
  };

  onSubmit = () => {
    const { type, category } = this.state;
    this.props.onSubmit({ type, category });
    this.dropdownRef.toggle(false);
  };

  reset = () => {
    this.onDropdownHide();
    this.props.reset();
    this.dropdownRef.toggle(false);
  };

  render() {
    const { classes, classNameIfFilter, influencerList, filterTypeList, style, styleGrInfluencers } = this.props;
    const { type, category } = this.state;
    const selectedTypeOption = filterTypeList.find(o => o.value === parseInt(type));
    const dropdownFirstKlass = [classes.dropdownFirst];
    if (classNameIfFilter) dropdownFirstKlass.push(classNameIfFilter);

    let badgeName = selectedTypeOption && selectedTypeOption.label;
    if (category && category.length) {
      const categories =
        category.length && influencerList.filter(influencer => category.indexOf(influencer.id + '') !== -1);
      if (categories.length) badgeName = selectedTypeOption.label.replace('Influencers', categories[0].name);
      // if (categories.length === 1) {
      //   badgeName = selectedTypeOption.label.replace("Influencers", categories[0].name);
      // } else {
      //   badgeName = selectedTypeOption.label.replace("Influencers", "Selected Influencers");
      // }
    }

    return (
      <Dropdown
        style={style}
        innerRef={com => {
          this.dropdownRef = com;
        }}
        classNameSelect={classes.dropdownFirstSelect}
        className={dropdownFirstKlass.join(' ')}
        classNameContainer={classes.dropdownFirstCt}
        onShow={this.onDropdownShow}
        onHide={this.onDropdownHide}
        label={badgeName}
      >
        <div
          style={styleGrInfluencers}
          className={[classes.dropdownSection, classes.influencerListKlass, 'scroll-vertical'].join(' ')}
        >
          <ul className={classes.dropdownSelectList}>
            {filterTypeList.map(i => (
              <li key={i.value} className={i.disabled ? 'disabled' : ''}>
                <input
                  type="radio"
                  id={'influencers-type-' + i.value}
                  name="influencersOnEvents"
                  value={i.value}
                  disabled={i.disabled || false}
                  defaultChecked={!category.length && parseInt(type) === i.value}
                  onChange={this.handleOptionChange}
                />
                <label htmlFor={'influencers-type-' + i.value}>{i.label}</label>
              </li>
            ))}
          </ul>
          <ul className={classes.dropdownSelectList}>
            {influencerList.length > 0 &&
              influencerList.map((item, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    id={label2Id(item.name)}
                    name="influencersOnEvents"
                    value={item.id}
                    defaultChecked={parseInt(type) === -3 && parseInt(category[0]) === parseInt(item.id)}
                    onChange={this.handleOptionChange}
                  />
                  <label htmlFor={label2Id(item.name)}>{item.name}</label>
                </li>
              ))}
          </ul>
        </div>
        {this.props.children}
        <div className={classes.btnGr}>
          <button type="button" className={classes.btnSecondary} onClick={this.reset}>
            Reset
          </button>
          <button type="button" className={classes.btnPrimary} onClick={this.onSubmit}>
            Apply
          </button>
        </div>
      </Dropdown>
    );
  }
}

EventFilter.defaultProps = {
  currentFilter: {
    type: -3,
  },
  filterTypeList: FILTER_TYPE_LIST,
  influencerList: [],
  reset: () => {
    console.info('reset click');
  },
};

export default injectStyle(style)(EventFilter);

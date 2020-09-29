const styles = {
  influencers: {},
  filter: {
    padding: '20px 20px 10px 20px',
    backgroundColor: '#f2f2f2',
  },
  // dropdown - start
  dropdownFirst: {
    width: 210,
    fontSize: 10,
    '& $dropdownFirstCt': {
      padding: '15px 10px',
    },
  },
  dropdownSecond: {
    width: 96,
    fontSize: 12,
    '& $dropdownSecondCt': {
      padding: '8px 0',
    },
    '& li': {
      cursor: 'pointer',
    }
  },
  dropdownThird: {
    width: 174,
    fontSize: 12,
    '& $dropdownThirdCt': {
      padding: '8px 0',
    },
  },
  dropdownFirstCt: {},
  dropdownSecondCt: {},
  dropdownFSSelect: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingRight: 20,
  },
  dropdownThirdCt: {},
  dropdownSection: {
    marginTop: '7px',
  },
  dropdownSelectList: {
    listStyleType: 'none',
    '& li': {
      padding: '0 10px',
      cursor: 'pointer',
      boxShadow: 'inset 0 -0.5px 0 0 #ddd',
      '& [type="radio"]:checked + label, & [type="radio"]:not(:checked) + label, & [type="checkbox"]:checked + label, & [type="checkbox"]:not(:checked) + label': {
        paddingTop: 7,
        paddingBottom: 7,
        display: 'block',
      },
      '&:hover': {
        background: 'var(--ice-blue)',
        color: 'var(--a1)',
      },
    },
  },
  dropdownSelectListB: {
    listStyleType: 'none',
    '& li': {
      padding: '7px 10px',
      '&:hover': {
        background: 'var(--ice-blue)',
        color: 'var(--a1)',
      }
    },
  },
  itemActive: {
    backgroundColor: '#f0f0f0',
  },
  searchForm: {
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    height: '25px',
    lineHeight: '25px',
    fontSize: 12,
    borderRadius: 2,
    padding: '0 10px',
    border: 'solid 1px #d8d8d8',
  },
  searchIco: {
    position: 'absolute',
    right: 12,
    top: 7,
  },
  note: {
    fontSize: 8,
    fontWeight: 'normal',
    color: '#58595b',
    marginTop: 10,
  },
  btnGr: {
    paddingTop: 15,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  btnSecondary: {
    fontSize: 9,
    color: 'var(--n1)',
    border: 0,
    textDecoration: 'underline',
    '&:hover': {
      color: 'var(--a1)',
    },
  },
  btnPrimary: {
    border: 0,
    height: 18,
    padding: '0 10px',
    fontSize: 10,
    borderRadius: 3,
    color: 'var(--g4)',
    marginLeft: 'auto',
    backgroundColor: 'var(--g2)',
  },
  // dropdown - end
  subTitle: {
    fontSize: 14,
    color: '#58595b',
    fontWeight: 'bold',
  },
  labelSortBy: {
    fontSize: 10,
    color: '#9b9b9b',
    paddingLeft: 5,
    paddingRight: 5,
  },
  pt10: {
    paddingTop: 10,
  },
  tags: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 4,
  },
  tag: {
    marginTop: '5px',
    height: 14,
    fontSize: 9,
    padding: '0 5px',
    borderRadius: '2px',
    backgroundColor: 'var(--p3)',
    marginRight: 8,
    display: 'inline-flex',
    alignItems: 'center',
    color: '#fffcf4',
  },
  btnResetTag: {
    cursor: 'pointer',
    fontSize: 9,
    textDecoration: 'underline',
    color: 'var(--n1)',
    background: "transparent",
    '&:hover': {
      color: 'var(--a1)',
    },
  },
  btnRemoveTag: {
    backgroundColor: 'transparent',
    height: '6px',
    width: '6px',
    cursor: 'pointer',
    display: 'inline-block',
    marginLeft: 5,
    border: 0,
    fill: '#fffcf4',
    '& svg': {
      display: 'block',
      fill: '#fffcf4',
    },
  },
  clockIco: {
    marginRight: 8,
    display: 'inline-block',
    marginBottom: -3,
    '& svg': {
      display: 'block',
    },
  },
  messagesList: {
    marginTop: 15,
    padding: '0 20px',
  },
  noMessages: {
    display: "block",
    color: "var(--n3)",
    fontSize: 14,
    textAlign: "center",
  },
  messagesTitle: {
    fontSize: 14,
    color: '#434a54',
    fontWeight: 400,
  },
  fontLight: {
    fontWeight: 300,
  },
  toggleTimeframe: {
    cursor: 'pointer',
    display: 'inline-block',
    padding: "20px 0 2px 0",
    borderBottom: "solid 2px var(--g1)",
  }
};

export default styles;

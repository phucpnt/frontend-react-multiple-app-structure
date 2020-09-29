export default {
  dropdownFirst: {
    width: 210,
    fontSize: 10,
    '& $dropdownFirstCt': {
      padding: '0 10px 10px',
    },
  },
  dropdownFirstCt: {},
  dropdownFirstSelect: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: 20,
    '&.focused': {
      border: 'solid 1px #ccc',
    },
  },
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
      '&:hover:not(.disabled)': {
        background: 'var(--ice-blue)',
        color: 'var(--a1)',
      },
      '&.disabled': {
        cursor: 'default',
        opacity: '0.5',
      },
    },
  },
  influencerListKlass: {
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '400px',
  },
  itemActive: {
    backgroundColor: '#f0f0f0',
  },
  searchForm: {
    position: 'relative',
  },
  searchInfluencer: {
    width: '100%',
    marginTop: 10,
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
    cursor: 'pointer',
    textDecoration: 'underline',
    background: 'transparent',
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
    cursor: 'pointer',
  },
};

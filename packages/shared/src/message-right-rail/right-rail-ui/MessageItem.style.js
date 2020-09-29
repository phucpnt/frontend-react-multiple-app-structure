const styles = {
  msgItemWrapper: {
    
  },
  msgItemHeader: {
    margin: '18px 0 4px 0',
    display: 'flex',
    alignItems: 'center',
  },
  msgItemInfluenceScoreWrapper: {
    display: 'flex',
    alignItems: 'center',

    '&:hover $msgItemInfluenceScore': {
      background: 'var(--g1)',
      cursor: 'default'
    }
  },
  msgItemInfluenceScore: {
    display: 'inline-block',
    width: 40,
    height: 20,
    backgroundColor: 'var(--g2)',
    textAlign: 'center',
    fontSize: 13,
    color: 'var(--g4)',
    lineHeight: 1.5,
  },
  infoIcon: {
    display: 'inline-block',
    width: 15,
    height: 15,
    backgroundSize: 'cover',
    marginLeft: 10,
  },
  tooltipContainer: {
    width: 240,
  },
  tooltipTitle: {
    fontWeight: 'bold',
    color: 'var(--g3)',
    fontSize: 11,
    lineHeight: (13/11),
  },
  tooltipContent: {
    color: 'var(--n3)',
    fontSize: 10,
    lineHeight: (13/10),
  },
  msgItem: {
    display: 'flex',
    marginBottom: 20,
    borderRadius: 2,
    border: 'solid 1px #e1e8ed',
    padding: '11px 17px 11px 11px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  msgItemTwitter: {
    marginBottom: 10,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  msgItemLeft: {
    flex: '0 1 55px',
  },
  msgItemMain: {
    flex: 1,
    overflow: 'hidden',
  },
  imgThumbnail: {
    width: 40,
    height: 40,
    backgroundColor: '#babcbe',
    borderRadius: 3,
  },
  msgHeadline: {
    fontSize: 10,
    position: 'relative',
    marginBottom: 7,
    '& a': {
      textDecoration: 'none',
    },
  },
  title: {
    color: '#434a54',
    fontWeight: 'bold'
  },
  subTitle: {
    color: '#777',
  },
  msgDate: {
    color: '#434a54',
  },
  msgIcon: {
    display: 'inline-block',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: 18,
    height: 18,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  msgUrl: {
    color: 'var(--n1)',
    display: "block",
    textDecoration: 'none',
    '&:hover': {
      color: 'var(--n2)',
    },
  },
  msgCt: {
    fontSize: 12,
    // color: 'var(--n1)',
    color: "inherit",
    marginTop: 10,
    '& a': {
      color: "inherit",
    }
  },
  msgFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  footerIconList: {
    display: 'flex',
    alignItems: 'center',
  },
  footerIcon: {
    width: 12,
    height: 12,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    display: 'inline-block',
    marginRight: 15,

    '&:nth-child(2)': {
      width: 16,
    }
  }
};

export default styles;

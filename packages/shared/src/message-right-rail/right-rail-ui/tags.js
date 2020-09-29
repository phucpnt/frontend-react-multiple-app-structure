import React from 'react';
import { ReactComponent as IconRemove } from './icon-tag-remove.svg'; // eslint-disable-line
import { FILTER_TYPE_LIST } from 'shared/lib/constant';
import { isArrayAvailable, isObjAvailable, getSafe } from '../../lib/util';

export function TagsInfluencer({ classes, topic, filter, influencerList, onRemoveFilter, resetFilter }) {
  let selectedFilterTypeOption = null;
  if (!isArrayAvailable(filter.influencerFilter.category)) {
    selectedFilterTypeOption = FILTER_TYPE_LIST.find(i => i.value === parseInt(filter.influencerFilter.type));
  }
  const selInfluencerGroups = influencerList.filter(
    inf => (filter.influencerFilter.category || []).indexOf(inf.id.toString()) > -1,
  );

  return (
    <div className={`${classes.tags} ${classes.pt10}`}>
      {topic && topic.ticker && <span className={classes.tag}>{topic.ticker}</span>}
      {isObjAvailable(selectedFilterTypeOption) ? (
        <span className={classes.tag}>
          {selectedFilterTypeOption.label}
          <button
            type="button"
            className={classes.btnRemoveTag}
            onClick={() => {
              onRemoveFilter({
                influencerFilterType: selectedFilterTypeOption.value,
              });
            }}
          >
            <IconRemove style={{ fill: '#fffcf4' }} width={'6px'} height={'6px'} />
          </button>
        </span>
      ) : null}
      {selInfluencerGroups.map(o => (
        <span key={o.id} className={classes.tag}>
          {`All ${o.name}`}
          <button
            type="button"
            className={classes.btnRemoveTag}
            onClick={() => {
              onRemoveFilter({ influencerCategory: o.id });
            }}
          >
            <IconRemove style={{ fill: '#fffcf4' }} width={'6px'} height={'6px'} />
          </button>
        </span>
      ))}
      {filter.extra &&
        filter.extra.topics &&
        filter.extra.topics
          .filter(t => t.id !== topic.id)
          .map(t => (
            <span key={t.id} className={classes.tag}>
              {t.ticker || t.name}
              <button
                type="button"
                className={classes.btnRemoveTag}
                onClick={() => {
                  onRemoveFilter({ mentionTopics: [t.id] });
                }}
              >
                <IconRemove style={{ fill: '#fffcf4' }} width={'6px'} height={'6px'} />
              </button>
            </span>
          ))}
      <span className={classes.btnResetTag} onClick={() => resetFilter()}>
        Reset All
      </span>
    </div>
  );
}

const Tag = ({ classes, item, onClickItem }) => (
  <span className={classes.tag}>
    {item.name}
    <button type="button" className={classes.btnRemoveTag} onClick={onClickItem}>
      <IconRemove style={{ fill: '#fffcf4' }} width={'6px'} height={'6px'} />
    </button>
  </span>
);

export function TagsEvent({ classes, topic, filter, impactGroupList, onRemoveFilter, resetFilter }) {
  const selImpactGroupList = impactGroupList.filter(im => im.id === parseInt(filter.impactGroupId));

  return (
    <div className={`${classes.tags} ${classes.pt10}`}>
      {topic && topic.ticker && <span className={classes.tag}>{topic.ticker}</span>}
      {selImpactGroupList.map(o => (
        <Tag classes={classes} item={o} key={o.id} onClickItem={() => onRemoveFilter({ impactGroupId: o.id })} />
      ))}

      {/** FIXME: it way to complex... */
      getSafe(() => {
        const impacts = filter.extra.impacts.filter(ip => isObjAvailable(ip));
        const impactIds = filter.impactIds.filter(ipid => ipid);
        return impacts.filter(item => impactIds.indexOf(item.id) > -1);
      }, []).map(e => (
        <Tag classes={classes} item={e} key={e.id} onClickItem={() => onRemoveFilter({ impactIds: e.id })} />
      ))}
      <span className={classes.btnResetTag} onClick={() => resetFilter()}>
        Reset All
      </span>
    </div>
  );
}

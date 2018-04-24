/**
 * Created by PanStar on 2018/3/5.
 */
import PropTypes from 'prop-types'
import { css } from "glamor";
import styles from './Cross.less';

const Cross = ({ title, left = '50%', top = '50%', parts = [], className = '', style }) => {
  const leftStyles = css({
    width: left
  });
  const rightStyles = css({
    width: `calc(100% - ${left})`
  });
  const topStyles = css({
    height: top
  });

  return (
    <div className={`${styles.cross} ${className} clear`} style={style}>
      <p className="cross-title" style={{display: (title ? '' : 'none')}}>{title}</p>
      <div className={`cross-left ${leftStyles}`}>
        <div className={`cross-part-top ${topStyles}`}>{parts.slice(0,1)}</div>
        <div>{parts.slice(2,3)}</div>
      </div>
      <div className={`cross-right ${rightStyles}`}>
        <div className={`cross-part-top ${topStyles}`}>{parts.slice(1,2)}</div>
        <div>{parts.slice(3,4)}</div>
      </div>
    </div>
  )
}

Cross.propTypes = {
  title: PropTypes.string,
  left: PropTypes.string,
  top: PropTypes.string,
  parts: PropTypes.array,
}

export default Cross

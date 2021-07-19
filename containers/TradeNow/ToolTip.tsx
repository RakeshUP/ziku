import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const ZikuTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#282A2D',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    padding: '0.75rem',
    fontFamily: 'inherit',
  },
}))(Tooltip);

export default ZikuTooltip;

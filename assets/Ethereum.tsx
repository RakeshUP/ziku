type OwnProps = {
  className?: string
  style?: React.CSSProperties
}

const EthereumIcon: React.FC<OwnProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 296 480" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.8">
      <path opacity="0.6" d="M147.687 177.339L0.444031 244.304L147.687 331.296L294.871 244.304L147.687 177.339Z" fill="#627EEA">
      </path>
    </g>
    <g opacity="0.65">
      <path opacity="0.45" d="M0.444031 244.304L147.686 331.296V0L0.444031 244.304Z" fill="#627EEA">
      </path>
    </g>
    <path opacity="0.8" d="M147.687 0V331.296L294.871 244.304L147.687 0Z" fill="#627EEA">
    </path>
    <g opacity="0.65">
      <path opacity="0.45" d="M0.444031 272.202L147.686 479.638V359.193L0.444031 272.202Z" fill="#627EEA">
      </path>
    </g>
    <path opacity="0.8" d="M147.687 359.193V479.638L294.987 272.202L147.687 359.193Z" fill="#627EEA">
    </path>
  </svg>
)

export default EthereumIcon
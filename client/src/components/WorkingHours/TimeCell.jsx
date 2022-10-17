import React from 'react'
import PropTypes from 'prop-types'

class TimeCell extends React.Component {
  constructor(props) {
    super(props)

    this.mouseDown = this.mouseDown.bind(this)
    // eslint-disable-next-line react/no-unused-class-component-methods
    this.elementRef = null
  }

  mouseDown(e) {
    const { startSelect, state } = this.props
    startSelect(state, e.target)
    e.preventDefault()
  }

  render() {
    const { state } = this.props
    const [di, tf, s, h] = [
      state.dayIndex,
      state.timeFrom.replace(':', '-'),
      state.selected ? ' selected' : '',
      state.hour ? ' hour' : ' half',
    ]
    const classNames = `time-cell time-cell-${di}-${tf}${s}${h}`

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <td
        ref={(input) => {
          // eslint-disable-next-line react/no-unused-class-component-methods
          this.elementRef = input
        }}
        className={classNames}
        onMouseDown={this.mouseDown}
      />
    )
  }
}

TimeCell.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  state: PropTypes.any.isRequired,
  startSelect: PropTypes.func.isRequired,
}

export default TimeCell

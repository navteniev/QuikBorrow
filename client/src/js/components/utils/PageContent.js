import React from 'react'
import styled from 'styled-components'
import PropTypes from "prop-types"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  padding: 0 65px 50px;
  > div:first-child {
    width: 100%;
    max-width: 1100px
  }
`

function Container(props) {
  return (
    <Wrapper>
      <div>
        {props.children}
      </div>
    </Wrapper>
  )
}

Container.propTypes = {
  children: PropTypes.node
}

export default Container

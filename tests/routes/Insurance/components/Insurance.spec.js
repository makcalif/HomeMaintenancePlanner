import React from 'react'
import { bindActionCreators } from 'redux'
import { Insurance } from 'routes/Insurance/components/Insurance'
import { shallow } from 'enzyme'

describe('(Component) Insurance', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      counter : 5,
      ...bindActionCreators({
        getInsuranceOptions : (_spies.doubleAsync = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Insurance {..._props} />)
  })

  it('renders as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  }) 

  it('renders with an <h2> that includes Insurance label.', () => {
    expect(_wrapper.find('h2').text()).to.match(/Insurance/)
  })
  
  describe('Get insurance button click', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'get insurance')
    })

    it('exists', () => {
      expect(_button).to.exist()
    })

    // it('is a secondary button', () => {
    //   expect(_button.hasClass('btn btn-secondary')).to.be.true()
    // })

    // it('Calls props.doubleAsync when clicked', () => {
    //   _spies.dispatch.should.have.not.been.called()

    //   _button.simulate('click')

    //   _spies.dispatch.should.have.been.called()
    //   _spies.doubleAsync.should.have.been.called()
    // })
  })
})

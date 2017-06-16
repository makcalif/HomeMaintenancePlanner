import React from 'react'
import { bindActionCreators } from 'redux'
import { FlightSearch } from 'routes/Flights/components/FlightSearch'
import { shallow } from 'enzyme'

describe('(Component) FlightSearch', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      flights : {flightsList :  
[ ]

      },
      ...bindActionCreators({
        getFlights : (_spies.getFlights = sinon.spy()),
        bookFlight : (_spies.bookFlight = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<FlightSearch {..._props} />)
  })

  it('renders as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  }) 

  it('renders as a <div>.', () => {
    let mkdiv = expect(_wrapper.find('div.price'));
      //mkdiv.text().to.equal('159');
    //expect(_button.hasClass('btn btn-secondary')).to.be.true()
  }) 

  // it('renders with an <h2> that includes Insurance label.', () => {
  //   expect(_wrapper.find('h2').text()).to.match(/Insurance/)
  // })
  
  // describe('Get insurance button click', () => {
  //   let _button

  //   beforeEach(() => {
  //     _button = _wrapper.find('button').filterWhere(a => a.text() === 'get insurance')
  //   })

  //   it('exists', () => {
  //     expect(_button).to.exist()
  //   })


  describe('Search flights', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Search')
    })

    it('exists', () => {
      expect(_button).to.exist()
    })


    it('Calls props.getFlights when clicked', () => {
      _spies.dispatch.should.have.not.been.called()

      _button.simulate('click')

      _spies.dispatch.should.have.been.called()
      _spies.getFlights.should.have.been.called()
    })
  })
    
  
})

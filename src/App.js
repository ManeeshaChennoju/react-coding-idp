import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import './App.css'

import Header from './components/Header'

// This is the list used in the application. You can move them to any component needed.
const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

const SliderItem = props => {
  const {details, isActive, sequenceNumber, onClickSlideItem} = props
  const {id, heading, description} = details
  const className = isActive ? 'sliderItem active_slide' : 'sliderItem'
  const onClickButton = () => {
    onClickSlideItem(id)
  }

  return (
    <li className={className} testid={`slideTab${sequenceNumber}`}>
      <p>{sequenceNumber}</p>
      <button onClick={onClickButton} className="button_card" type="button">
        <h1 className="card_heading">{heading}</h1>
        <p className="card_para">{description}</p>
      </button>
    </li>
  )
}

// Replace your code here
class App extends Component {
  state = {
    slidesList: initialSlidesList,
    activeSlide: initialSlidesList[0].id,
    editableHeading: false,
    editableDescription: false,
    heading: initialSlidesList[0].heading,
    description: initialSlidesList[0].description,
  }

  handleHeadingClick = () => {
    this.setState({editableHeading: true})
  }

  handleDescriptionClick = () => {
    this.setState({editableDescription: true})
  }

  handleHeadingChange = event => {
    const {activeSlide, slidesList} = this.state
    const {value} = event.target
    const updatedList = slidesList.map(item => {
      if (item.id === activeSlide) {
        return {...item, heading: value}
      }
      return item
    })
    this.setState({heading: value, slidesList: updatedList})
  }

  handleDescriptionChange = event => {
    const {activeSlide, slidesList} = this.state
    const {value} = event.target
    const updatedList = slidesList.map(item => {
      if (item.id === activeSlide) {
        return {...item, description: value}
      }
      return item
    })
    this.setState({description: value, slidesList: updatedList})
  }

  handleDescriptionBlur = () => {
    const {description, slidesList, activeSlide} = this.state
    const updatedList = slidesList.map(item => {
      if (item.id === activeSlide) {
        return {
          ...item,
          description: description === '' ? 'Description' : description,
        }
      }
      return item
    })
    this.setState({
      editableDescription: false,
      description: description === '' ? 'Description' : description,
      slidesList: updatedList,
    })
  }

  handleHeadingBlur = () => {
    const {heading, slidesList, activeSlide} = this.state
    const updatedList = slidesList.map(item => {
      if (item.id === activeSlide) {
        return {
          ...item,
          heading: heading === '' ? 'Heading' : heading,
        }
      }
      return item
    })
    this.setState({
      editableHeading: false,
      heading: heading === '' ? 'Heading' : heading,

      slidesList: updatedList,
    })
  }

  getSequenceNum = id => {
    const {slidesList} = this.state
    const index = slidesList.findIndex(obj => obj.id === id)
    return index + 1
  }

  onClickSlideItem = id => {
    const {slidesList} = this.state
    const obj = slidesList.find(item => item.id === id)
    const {heading, description} = obj
    this.setState({activeSlide: id, heading, description})
  }

  onClickNew = () => {
    const {slidesList, activeSlide} = this.state
    const index = this.getSequenceNum(activeSlide)
    const newObject = {
      id: uuidV4(),
      heading: 'Heading',
      description: 'Description',
    }
    // const updatedList = slidesList.splice(index, 0, newObject)
    const updatedList = [
      ...slidesList.slice(0, index),
      newObject,
      ...slidesList.slice(index),
    ]
    const {heading, description} = newObject
    this.setState({
      slidesList: updatedList,
      activeSlide: newObject.id,
      heading,
      description,
    })
  }

  render() {
    const {
      slidesList,
      activeSlide,
      editableHeading,
      editableDescription,
      heading,
      description,
    } = this.state
    return (
      <>
        <Header />

        <div className="main_container">
          <div className="new_button">
            <button type="button" onClick={this.onClickNew}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
                alt="new plus icon"
              />
              New
            </button>
          </div>
          <div className="content_container">
            <ol className="ul_slides_container">
              {slidesList.map(eachItem => (
                <SliderItem
                  isActive={eachItem.id === activeSlide}
                  key={eachItem.id}
                  details={eachItem}
                  sequenceNumber={this.getSequenceNum(eachItem.id)}
                  onClickSlideItem={this.onClickSlideItem}
                />
              ))}
            </ol>
            <div className="slide_container">
              {editableHeading ? (
                <input
                  type="text"
                  value={heading}
                  onChange={this.handleHeadingChange}
                  onBlur={this.handleHeadingBlur}
                />
              ) : (
                <h1 onClick={this.handleHeadingClick}>{heading}</h1>
              )}
              {/* <h2 onClick={this.handleHeadingClick}>
                  {editable ? (
                    <input
                      type="text"
                      value={heading}
                      onChange={this.handleHeadingChange}
                      onBlur={this.handleBlur}
                    />
                  ) : (
                    heading
                  )}
                </h2> */}

              {editableDescription ? (
                <input
                  value={description}
                  onChange={this.handleDescriptionChange}
                  onBlur={this.handleDescriptionBlur}
                />
              ) : (
                <p onClick={this.handleDescriptionClick}>{description}</p>
              )}
              {/* <p onClick={this.handleDescriptionClick}>
                  {editable ? (
                    <input
                      value={description}
                      onChange={this.handleDescriptionChange}
                      onBlur={this.handleBlur}
                    />
                  ) : (
                    description
                  )}
                </p> */}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App

// ------------------------------------------------------------

import React from 'react';
import { Link, withRouter } from 'react-router';

class AddListingFirst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "title": 50,
      "description": 500,
      image_errors: [],
      original_filename: null,
      format: null,
      url: null
    };
    this.textUpdate = this.textUpdate.bind(this);
    this.handleCounter = this.handleCounter.bind(this);
    this.upload = this.upload.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePeriod = this.handlePeriod.bind(this);
  }

  componentDidMount() {
    this.props.updateListingForm({host_id: this.props.currentUser.id});
    this.setState({url: this.props.listingFormState.image_url});
    this.setState({format: this.props.listingFormState.format});
    this.setState({original_filename: this.props.listingFormState.original_filename});
    this.refs.titleField.value = this.props.listingFormState.title;
    this.refs.descriptionField.value = this.props.listingFormState.description;
    this.setState({title: 50-this.props.listingFormState.title.length});
    this.setState({description: 500-this.props.listingFormState.description.length});
  }

  componentDidUpdate() {
    if(this.props.currentUser === null){
      this.props.router.replace('/become-a-host');
    }
  }

  textUpdate(field, max) {
    return (e) => {
      e.target.style.height = "0px";
      e.target.style.height = (e.target.scrollHeight + 1)+"px";
      this.setState({[field]: max - e.target.value.length});
      this.props.updateListingForm({[field]: e.target.value});
    };
  }

  handleCounter(field, min) {
    if (this.state[field] <= min) {
      return `alf-${field}-counter alf-low`;
    }
    else {
      return `alf-${field}-counter`;
    }
  }

  upload(e) {
    e.preventDefault();
    cloudinary.openUploadWidget(
      window.cloudinary_options,
      (error, images) => {
        if (error === null) {
          let file = images[0];
          let newErrors = [];
          if (file.bytes > 10000000) {
            newErrors.push("File size cannot exceed 10 MB");
          }
          if (file.format !== "jpg" && file.format !== "tif" && file.format !== "png") {
            newErrors.push("File type must be JPEG, TIF, or PNG");
          }
          this.setState({image_errors: newErrors});
          if (newErrors.length === 0) {
            this.setState({format: file.format});
            this.setState({original_filename: file.original_filename});
            this.setState({url: file.secure_url});
            this.props.updateListingForm({
              image_url: file.secure_url,
              original_filename: file.original_filename,
              format: file.format,});
          }
        }
    });
  }

  handleNext() {
    if (this.state.title < 50 && this.state.title >=0 &&
      this.state.description < 500 && this.state.description >= 0 &&
      this.state.url !== null && this.state.image_errors.length === 0) {
        return "alf-next";
    }
    else {
      return "alf-next-dead";
    }
  }

  handleNextClick(e) {
    e.preventDefault;
    if (this.state.title < 50 && this.state.title >=0 &&
      this.state.description < 500 && this.state.description >= 0 &&
      this.state.url !== null && this.state.image_errors.length === 0) {
        this.props.updateListingForm({current_form: "set-the-scene"});
        this.props.router.push('/become-a-host/scene');
    }
  }

  handlePeriod() {
    if (this.state.url !== null) {
      return ".";
    }
    else {
      return null;
    }
  }

  render() {
    let user = this.props.currentUser;
    return (
      <div className="add-listing-form">
        <div className="alf-first-half">
          <div className="alf-col-first">
            <div className="alf-form">
              <span className="alf-field-title">Name your place</span>
              <div className="alf-input-row">
                <textarea
                  ref="titleField"
                  className="alf-text-full"
                  onKeyUp={this.textUpdate("title", 50)}>
                </textarea>
                <span className={this.handleCounter("title", 10)}>{this.state.title}</span>
              </div>

              <span className="alf-field-title">Edit your description</span>
                <div className="alf-input-row">
                  <textarea
                    ref="descriptionField"
                    className="alf-text-full"
                    onKeyUp={this.textUpdate("description", 500)}>
                  </textarea>
                  <span className={this.handleCounter("description", 50)}>{this.state.description}</span>
                </div>

              <span className="alf-field-title alf-header-over">Upload a photo</span>
              <ul className="alf-errors">
                {this.state.image_errors.map((error, idx) => (
                  <span key={idx} className="alf-error">{error}</span>
                ))}
              </ul>
              <img className="alf-file-image" src={this.state.url}/>
              <span className="alf-file-name">{this.state.original_filename}{this.handlePeriod()}{this.state.format}</span>
              <button onClick={this.upload} className="alf-upload">Upload Image</button>
            </div>

            <div className="alf-nav">
              <Link to="/become-a-host" className="alf-back">Back</Link>
              <button className={this.handleNext()} onClick={this.handleNextClick}>Next</button>
            </div>


          </div>
        </div>

        <div className="alf-second-half">
          <div className="alf-col-second">
            <div className="alf-tip-box">
              <img className="alh-tip-icon" src="https://res.cloudinary.com/dsguwnfdw/image/upload/v1478477881/Icons/Screen_Shot_2016-11-06_at_4.17.32_PM.png"/>
              <span className="alf-tip-content">
                This is your summary title and description. You can edit and change them as you see fit. Keeping it brief makes it easier for guests. Then just add a picture to get started!
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddListingFirst);

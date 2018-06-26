import React, { Component } from 'react';
import { connect } from 'react-redux';
import Master from '../Master';

/** Add new business component */
export class AddBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      category: '',
      country: '',
      city: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveBusiness = this.saveBusiness.bind(this);
  }
  handleChange(e) {
    const value = {};
    value[e.target.name] = e.target.value;
    this.setState(value);
  }
  saveBusiness(e) {
    e.preventDefault();
    console.log(this.state);
  }
  render() {
    return (
      <Master>
        <h5 className="text-center">Add new business</h5>
        <hr />
        <form method="post" onSubmit={this.saveBusiness}>
          <div className="form-group row justify-content-center">
            <div className="col-md-2">
              <label>Name</label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                className="form-control form-control-sm"
                placeholder="Enter business name..."
              />
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <div className="col-md-2">
              <label>Category</label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
                className="form-control form-control-sm"
                placeholder="Enter business name..."
              />
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <div className="col-md-2">
              <label>Description</label>
            </div>
            <div className="col-md-6">
              <textarea
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                className="form-control form-control-sm"
                style={{ minHeight: '160px' }}
                placeholder="Describe your business..."
              >
                We have best coffee for you, Come and drink it in the best view
                of the town
              </textarea>
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <div className="col-md-2">
              <label>Country</label>
            </div>
            <div className="col-md-6">
              <select
                className="form-control form-control-sm"
                name="country"
                onChange={this.handleChange}
                defaultValue=""
              >
                <option disabled value="">
                  Select country the business reside in ...
                </option>
                <option>Burundi</option>
                <option>Kenya</option>
                <option>Rwanda</option>
                <option>Tanzania</option>
                <option>Uganda</option>
              </select>
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <div className="col-md-2">
              <label>City</label>
            </div>
            <div className="col-md-6">
              <select
                className="form-control form-control-sm"
                name="country"
                onChange={this.handleChange}
                defaultValue=""
              >
                <option disabled value="">
                  Select city the business reside in ...
                </option>
                <option>Nairobi</option>
                <option>Nakuru</option>
                <option>Mombasa</option>
                <option>Eldoret</option>
              </select>
            </div>
          </div>
          <br />
          <br />
          <div className="form-group">
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-sm">
                Save new business
              </button>
            </div>
          </div>
        </form>
      </Master>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBusiness);

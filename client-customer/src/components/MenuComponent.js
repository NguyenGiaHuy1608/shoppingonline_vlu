import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from '../utils/withRouter';
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu">
          <Link to={"/product/category/" + item._id}>{item.name}</Link>
        </li>
      );
    });

    return (
      <header className="header-top">
        <div>
          <h1 className="logo">ShopOnline</h1>
          <p className="site-tagline">Tìm đồ ngon, giá hời, giao tận nơi</p>
        </div>

        <nav>
          <ul className="navbar">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin/customer">Admin</Link>
            </li>
            {cates}
          </ul>
        </nav>

        <div>
          <form className="search">
            <input
              type="search"
              placeholder="Tìm sản phẩm..."
              className="keyword"
              value={this.state.txtKeyword || ''}
              onChange={(e) => this.setState({ txtKeyword: e.target.value })}
            />
            <input
              type="submit"
              value="SEARCH"
              onClick={(e) => this.btnSearchClick(e)}
            />
          </form>
        </div>
      </header>
    );
  }
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  componentDidMount() {
    this.apiGetCategories();
  }

  // apis
  apiGetCategories() {
    axios.get("/api/customer/categories").then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);


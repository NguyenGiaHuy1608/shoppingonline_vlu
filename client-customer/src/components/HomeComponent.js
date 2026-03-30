import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
    };
  }

  render() {
    const placeholderProducts = [
      {
        _id: 'placeholder-1',
        name: 'Smartphone AI Pro',
        price: 14500000,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      },
      {
        _id: 'placeholder-2',
        name: 'Tai nghe Bluetooth 3D',
        price: 1790000,
        image: 'https://images.unsplash.com/photo-1580894908361-833f8d7c4d88?auto=format&fit=crop&w=600&q=80',
      },
      {
        _id: 'placeholder-3',
        name: 'Balo Du lịch Chống nước',
        price: 650000,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      },
      {
        _id: 'placeholder-4',
        name: 'Đồng hồ thông minh',
        price: 2450000,
        image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80',
      },
    ];

    const dataNewProds = this.state.newprods.length ? this.state.newprods : placeholderProducts;
    const dataHotProds = this.state.hotprods.length ? this.state.hotprods : placeholderProducts;

    const newprods = dataNewProds.map((item) => {
      return (
        <article key={item._id} className="product-card">
          <Link to={'/product/' + item._id}>
            <img
              src={item.image ? 'data:image/jpg;base64,' + item.image : '/default-product.jpg'}
              alt={item.name}
            />
          </Link>
          <div className="product-card-body">
            <div>
              <h3 className="product-title">{item.name}</h3>
              <p className="product-price">{Number(item.price || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            </div>
          </div>
        </article>
      );
    });

    const hotprods = this.state.hotprods.map((item) => {
      return (
        <article key={item._id} className="product-card">
          <Link to={'/product/' + item._id}>
            <img
              src={item.image ? 'data:image/jpg;base64,' + item.image : '/default-product.jpg'}
              alt={item.name}
            />
          </Link>
          <div className="product-card-body">
            <div>
              <h3 className="product-title">{item.name}</h3>
              <p className="product-price">{Number(item.price || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            </div>
          </div>
        </article>
      );
    });

    return (
      <div className="body-customer">
        <div className="header-top">
          <div>
            <h1 className="logo">My Shopping</h1>
            <p className="site-tagline">Mua sắm tiện lợi, giao hàng nhanh</p>
          </div>
        </div>

        <section className="highlight-cards" style={{ marginBottom: '20px' }}>
          <h2 className="text-center">Khuyến mãi đặc biệt</h2>
          <div className="product-grid">
            {placeholderProducts.slice(0, 3).map((item) => (
              <article key={item._id} className="product-card highlight-card">
                <Link to={'/product/' + item._id}>
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="product-card-body">
                  <h3 className="product-title">{item.name}</h3>
                  <p className="product-price">{Number(item.price || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-center">NEW PRODUCTS</h2>
          {newprods?.length ? (
            <div className="product-grid">{newprods}</div>
          ) : (
            <p className="text-center">Đang tải sản phẩm mới...</p>
          )}
        </section>

        {this.state.hotprods.length > 0 && (
          <section style={{ marginTop: '24px' }}>
            <h2 className="text-center">HOT PRODUCTS</h2>
            <div className="product-grid">{hotprods}</div>
          </section>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}

export default Home;
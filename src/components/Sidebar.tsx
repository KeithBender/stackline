import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  product: {
    title: string;
    subtitle: string;
    image: string;
    tags: string[];
  };
}

const Sidebar: React.FC<SidebarProps> = ({ product }) => {
  return (
    <div className="sidebar">
      <img src={product.image} alt={product.title} style={{ width: '100%', height: 'auto' }} />
      <h2>{product.title}</h2>
      <p>{product.subtitle}</p>
      <div className='tags'>
        {product.tags.map(tag => (
          <button key={tag}>{tag}</button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

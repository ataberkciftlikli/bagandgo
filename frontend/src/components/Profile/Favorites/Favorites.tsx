// components/Profile/Favorites/Favorites.tsx
import React from 'react';
import FavoriteItem from './FavoriteItem';
import './favorites.css';
import tadim from '../../icons/tadim.jpg';
import gazoz from '../../icons/gazoz.jpg';
import tadim2 from '../../icons/tadim2.jpg';
import sens from '../../icons/sens.jpg';
import ariel from '../../icons/ariel.jpg';
import omo from '../../icons/omo.jpg';
import filiz from '../../icons/filiz.jpg';
import nesfit from '../../icons/nesfit.jpg';
import borek from '../../icons/borek.jpg';
import kodak from '../../icons/kodak.jpg';


const favoriteItems = [
  { id: '1', name: 'Tadım Kavrulmuş Siyah Ayçekirdeği 180 G', price: '32,95 TL', rating: 4.5, reviewCount: 8, image: tadim },
  { id: '2', name: 'Çamlıca Limon Aromalı Gazoz 1 L', price: '31,50 TL', rating: 4.8, reviewCount: 1459, image: gazoz },
  { id: '3', name: 'Tadım Kavrulmuş Kaju Fıstığı', price: '109,95 TL', rating: 4.9, reviewCount: 205, image: tadim2 },
  { id: '4', name: 'Sensodyne Eksta Beyazlatıcı Diş Macunu 75 Ml', price: '117,95 TL', rating: 4.7, reviewCount: 839, image: sens },
  { id: '5', name: 'Ariel Dağ Esintisi 3 Kg AquaPudra Toz Çamaşır Deterjanı', price: '219,95 TL', rating: 4.7, reviewCount: 839, image: ariel },
  { id: '6', name: 'Omo Sıvı Active Cold Power Beyazlar ve Renkliler İçin Çamaşır Deterjanı 1690 Ml', price: '235,95 TL', rating: 4.5, reviewCount: 8, image: omo },
  { id: '7', name: 'Filiz Fiyonk Makarna 500 G', price: '22,75 TL', rating: 4.8, reviewCount: 1459, image: filiz },
  { id: '8', name: 'Nestlé Nesfit Çikolatalı Tam Tahıl ve Pirinç Gevreği 400g', price: '145,95 TL', rating: 4.9, reviewCount: 205, image: nesfit },
  { id: '9', name: 'Superfresh Patatesli Rulo Börek 500 G', price: '99,95 TL', rating: 4.7, reviewCount: 839, image: borek },
  { id: '10', name: 'Kodak Çinko Karbon Kalem Pil Blister Aa 4lü', price: '42,95 TL', rating: 4.7, reviewCount: 839, image: kodak },
  // Add more favorite items here
];

const Favorites: React.FC = () => {
  return (
    <div id="favorites-section" className="favorites-section">
    <div className="favorites-container">
      <h2>Favorites</h2>
      <div className="favorites-list">
        {favoriteItems.map(item => (
          <FavoriteItem key={item.id} item={item} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Favorites;

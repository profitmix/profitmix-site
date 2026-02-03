// src/components/Shared/Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ currentPage }) => {
  const location = useLocation();
  
  const getPathSegments = () => {
    const segments = location.pathname.split('/').filter(segment => segment);
    
    if (segments.length === 0) {
      return [{ name: 'Home', path: '/' }];
    }
    
    const breadcrumbs = [{ name: 'Home', path: '/' }];
    
    let path = '';
    segments.forEach((segment, index) => {
      path += `/${segment}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
      
      if (index === segments.length - 1) {
        breadcrumbs.push({ name: currentPage || name, path, isCurrent: true });
      } else {
        breadcrumbs.push({ name, path });
      }
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = getPathSegments();

  return (
    <nav className="py-4 bg-dark-900/50 border-b border-gold-500/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gold-500/50" />
              )}
              
              {index === breadcrumbs.length - 1 ? (
                <span className={`flex items-center space-x-1 ${
                  crumb.isCurrent ? 'text-gold-400 font-semibold' : 'text-gray-400'
                }`}>
                  {index === 0 && <Home className="w-4 h-4" />}
                  <span>{crumb.name}</span>
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="flex items-center space-x-1 text-gray-400 hover:text-gold-300 transition-colors"
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  <span>{crumb.name}</span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
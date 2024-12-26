'use client';

import React, { useState } from 'react';
import Heatmap, { HeatmapProps } from '../Heatmap';

const BasketballHeatmap: React.FC<HeatmapProps> = ({ data }) => {
  const [filters, setFilters] = useState({
    quarter: '',
    player: '',
    team: '',
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredData = data.filter(
    (shot) =>
      (!filters.quarter || shot.quarter === filters.quarter) &&
      (!filters.player || shot.player === filters.player) &&
      (!filters.team || shot.team === filters.team),
  );

  return (
    <div>
      <div>
        <label>Quarter:</label>
        <select onChange={(e) => handleFilterChange('quarter', e.target.value)}>
          <option value="">All</option>
          <option value="1">Q1</option>
          <option value="2">Q2</option>
          <option value="3">Q3</option>
          <option value="4">Q4</option>
        </select>

        <label>Player:</label>
        <input
          type="text"
          onChange={(e) => handleFilterChange('player', e.target.value)}
        />

        <label>Team:</label>
        <select onChange={(e) => handleFilterChange('team', e.target.value)}>
          <option value="">All</option>
          <option value="0">Team 0</option>
          <option value="1">Team 1</option>
        </select>
      </div>

      <Heatmap data={filteredData} />
    </div>
  );
};

export default BasketballHeatmap;

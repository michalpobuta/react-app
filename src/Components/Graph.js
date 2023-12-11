import React, { useEffect, useState, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import axios from 'axios';

function Graph() {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const networkContainer = useRef(null);
  
  useEffect(() => {
    const address = localStorage.getItem('serverAddress');
    axios.get(`${address}/getGraphData`)
      .then(response => {
        const { nodes, edges } = response.data;
        const formattedNodes = nodes.map(node => {
          const titleData = JSON.parse(node.title);
          return {
            ...node,
            label: titleData.nazwa || titleData.tytul || node.label, 
            title: Object.entries(titleData).map(([key, value]) => `${key}: ${value}`).join(', ')
          };
        });
        const formattedEdges = edges.map(edge => {
          return {
            ...edge,
            label: edge.label + (edge.ocena ? ` (${edge.ocena})` : ''), 
            arrows: 'to' 
          };
        });

        setGraphData({ nodes: new DataSet(formattedNodes), edges: new DataSet(formattedEdges) });
      })
      .catch(error => console.error('Błąd przy pobieraniu danych grafu', error));
  }, []);

  useEffect(() => {
    if (networkContainer.current) {
      const options = {
        nodes: {
          shape: 'dot',
          size: 16,
          font: {
            size: 14
          }
        },
        edges: {
          font: {
            size: 12,
            align: 'top'
          },
          color: {
            color: '#848484',
            highlight: '#848484',
            hover: '#848484',
            inherit: 'from',
            opacity: 1.0
          },
          arrows: {
            to: { enabled: true, scaleFactor: 1, type: 'arrow' }
          }
        }
      };
      new Network(networkContainer.current, graphData, options);
    }
  }, [graphData]);

  return (
    <div ref={networkContainer} style={{ height: '500px', width: '100%' }} />
  );
}

export default Graph;

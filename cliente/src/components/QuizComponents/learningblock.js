import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LearningBlock = ({ title, description, imageUrl, learningBlock}) => {
  return (
    <Card className="mb-4">
      {imageUrl && <Card.Img variant="top" src={imageUrl} alt={title} />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Link to={learningBlock}>
        </Link>
        
      </Card.Body>
    </Card>
  );
};

export default LearningBlock;

import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const LearningBlockCard = ({
  id,
  title,
  summary,
  subject,
  level,
  estimated_minutes,
  tags = []
}) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between mb-2">
          <Badge bg="secondary">{subject}</Badge>
          <Badge bg="info">Level {level}</Badge>
        </div>

        <Card.Title>{title}</Card.Title>
        <Card.Text>{summary}</Card.Text>

        <div className="mb-3 text-muted">
          {estimated_minutes} min
        </div>

        <div className="mb-3">
          {tags.map((tag, index) => (
            <Badge key={index} bg="light" text="dark" className="me-2">
              {tag}
            </Badge>
          ))}
        </div>

        <Link to={`/blocks/${id}`}>
          <Button variant="primary">Start</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default LearningBlockCard;
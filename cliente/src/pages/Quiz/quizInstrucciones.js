import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';



function QuizIn() {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Instrucciones para la prueba diagnostica</Card.Title>
          <Card.Text>
            <p>Antes de comenzar la prueba, te recomendamos:</p>
            <ul>
              <li>Leer con atención cada pregunta.</li>
              <li><strong>Contaras con 60 segundos para completar la prueba</strong></li>
              <li>Evitar distracciones y mantener la concentración.</li>
            </ul>
            <p>¿Estás listo para empezar?</p>
          </Card.Text>

          <div>
            <Link to="/quiz">
              <Button variant="success" className="me-2">
                Sí, comenzar la prueba
              </Button>
            </Link>
            <Link to="/home">
              <Button variant="danger">
                No, regresar al inicio
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default QuizIn;
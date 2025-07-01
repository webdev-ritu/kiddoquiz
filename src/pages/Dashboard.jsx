import { useEffect } from 'react';
import { Container, Row, Col, Table, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import ProgressChart from '../components/ProgressChart';
import { motion } from 'framer-motion';
import '../components/animations.css'; // Importing animations CSS

export default function Dashboard() {
  const { user, progress } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/parent');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="dashboard-bg">
      <Container className="py-5">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <h2 className="fw-bold text-primary">👨‍👩‍👧 Parent Dashboard</h2>
          <p className="text-muted">Track your child’s learning journey</p>
          <Button 
            variant="outline-primary" 
            className="rounded-pill mt-2 px-4"
            onClick={() => navigate('/')}
          >
            ⬅ Back to Quiz
          </Button>
        </motion.div>

        {/* Progress Chart */}
        <Row className="mb-5">
          <Col>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-success fw-semibold mb-3">📈 Progress Overview</h4>
              {progress.length > 0 ? (
                <ProgressChart progressData={progress} />
              ) : (
                <p className="text-muted">No progress data available yet.</p>
              )}
            </motion.div>
          </Col>
        </Row>

        {/* Quiz History Table */}
        <Row>
          <Col>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-info fw-semibold mb-3">📜 Quiz History</h4>
              {progress.length > 0 ? (
                <Table bordered hover responsive className="bg-white rounded shadow-sm">
                  <thead className="table-light">
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Score</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {progress.map((item, index) => {
                      const percent = Math.round((item.score / item.total) * 100);
                      const badgeVariant = percent >= 70 ? 'success' : percent >= 50 ? 'warning' : 'danger';

                      return (
                        <tr key={index}>
                          <td>{new Date(item.date).toLocaleDateString()}</td>
                          <td className="text-capitalize">{item.category}</td>
                          <td>{item.score} / {item.total}</td>
                          <td>
                            <Badge bg={badgeVariant} className="fs-6 px-3">
                              {percent}%
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <p className="text-muted">No quiz attempts recorded yet.</p>
              )}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

import { Col, Row, Stack, Badge, Button } from "react-bootstrap";
import { useNote } from "../components/NoteLayout";
import ReactMarkdown from "react-markdown";
import { useNavigate, Link } from "react-router-dom";

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({onDelete}: NoteProps) {
  const navigate  = useNavigate();
  const note = useNote();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col >
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className=" flex-wrap">
              {note.tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate p-1 mt-1">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="outline-danger" onClick={() => {
              onDelete(note.id)
              navigate("/")
            }
            }>Delete</Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}

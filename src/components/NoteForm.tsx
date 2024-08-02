import React, { useRef, useState } from "react";
import "bootstrap/";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import { NoteData } from "../App";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tags) => void;
  availableTags: Tags[];
} & Partial<NoteData>;

type Tags = {
  id: string;
  label: string;
};

const NoteForm = ({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [] }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const mackdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tags[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: mackdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} defaultValue={title} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidv4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    }),
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control defaultValue={markdown} required as="textarea" ref={mackdownRef} rows={15} />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Link to="..">
            <Button variant="outline-secondary" type="button">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;

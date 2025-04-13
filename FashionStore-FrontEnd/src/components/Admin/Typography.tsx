import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Typography: React.FC = () => {
  const bgColors: string[] = [
    'primary', 'secondary', 'success', 'danger', 'warning', 'info',
    'light', 'dark', 'body', 'white', 'transparent'
  ];

  const textColors: string[] = [
    'primary', 'secondary', 'success', 'danger', 'warning', 'info',
    'light', 'dark', 'body', 'muted', 'white', 'black-50', 'white-50'
  ];

  return (
    <Container fluid>
      <Row className="g-4">
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Background Colors</h6>
            {bgColors.map((color) => (
              <div
                key={color}
                className={`p-2 mb-2 bg-${color} ${color === 'warning' || color === 'info' || color === 'light' || color === 'body' || color === 'transparent' ? 'text-dark' : 'text-white'}`}
              >
                .bg-{color}
              </div>
            ))}
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Text Colors</h6>
            {textColors.map((color) => (
              <p
                key={color}
                className={`text-${color} ${['warning', 'info', 'light', 'white', 'white-50'].includes(color) ? 'bg-dark' : ''}`}
              >
                .text-{color}
              </p>
            ))}
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Headings</h6>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <React.Fragment key={num}>
                <h1 className={`h${num}`}>h{num} Heading</h1>
                <p className={`h${num}`}>.h{num} Heading</p>
              </React.Fragment>
            ))}
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Display Headings</h6>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <h1 key={num} className={`display-${num}`}>
                Display {num}
              </h1>
            ))}
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Text Elements</h6>
            <p>This is a standard paragraph</p>
            <p>You can use the mark tag to <mark>highlight</mark> text.</p>
            <p><del>This line of text is meant to be treated as deleted text.</del></p>
            <p><s>This line of text is meant to be treated as no longer accurate.</s></p>
            <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
            <p><u>This line of text will render as underlined.</u></p>
            <p><small>This line of text is meant to be treated as fine print.</small></p>
            <p><strong>This line rendered as bold text.</strong></p>
            <p><em>This line rendered as italicized text.</em></p>
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Blockquotes</h6>
            {['start', 'center', 'end'].map((align, index) => (
              <div key={index} className="border rounded p-4 pb-0 mb-4">
                <figure className={`text-${align}`}>
                  <blockquote className="blockquote">
                    <p>A well-known quote, contained in a blockquote element.</p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Unstyled List</h6>
            <ul className="list-unstyled mb-0">
              <li>This is a list.</li>
              <li>It appears completely unstyled.</li>
              <li>Structurally, it's still a list.</li>
              <li>However, this style only applies to immediate child elements.</li>
              <li>
                Nested lists:
                <ul>
                  <li>are unaffected by this style</li>
                  <li>will still show a bullet</li>
                  <li>and have appropriate left margin</li>
                </ul>
              </li>
              <li>This may still come in handy in some situations.</li>
            </ul>
          </div>
        </Col>
        <Col sm={12} xl={6}>
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Description List</h6>
            <dl className="row mb-0">
              <dt className="col-sm-4">Description lists</dt>
              <dd className="col-sm-8">A description list is perfect for defining terms.</dd>
              <dt className="col-sm-4">Term</dt>
              <dd className="col-sm-8">Definition for the term.</dd>
              <dt className="col-sm-4">Another term</dt>
              <dd className="col-sm-8">This definition is short, so no extra paragraphs or anything.</dd>
              <dt className="col-sm-4 text-truncate">Truncated term is truncated</dt>
              <dd className="col-sm-8">This can be useful when space is tight. Adds an ellipsis at the end.</dd>
              <dt className="col-sm-4">Nesting</dt>
              <dd className="col-sm-8">
                <dl className="row">
                  <dt className="col-sm-4">Nested list</dt>
                  <dd className="col-sm-8">Nested definition list.</dd>
                </dl>
              </dd>
            </dl>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Typography;
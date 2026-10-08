import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Download, Printer, X } from 'lucide-react';

function BookReader({ book, initialPage = 0, onClose }) {
  const [pageIndex, setPageIndex] = useState(initialPage);
  const page = book.pages[pageIndex];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') setPageIndex((current) => Math.max(0, current - 1));
      if (event.key === 'ArrowRight') {
        setPageIndex((current) => Math.min(book.pages.length - 1, current + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [book.pages.length, onClose]);

  const handleDownload = () => {
    const content = [
      book.title,
      book.subtitle,
      ...book.pages.flatMap((notePage, index) => [
        '',
        `Page ${index + 1}: ${notePage.title}`,
        ...notePage.paragraphs,
        ...(notePage.bullets || []).map((bullet) => `- ${bullet}`),
        ...(notePage.code ? ['', notePage.code] : []),
        ...(notePage.sources || []).map((source) => `Source: ${source.label} - ${source.url}`),
      ]),
    ].join('\n');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <>
      <div className="book-reader-overlay" role="presentation">
        <section
          className="book-reader"
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-reader-title"
        >
          <header className="book-reader-toolbar">
            <div className="book-reader-heading">
              <BookOpen size={20} aria-hidden="true" />
              <div>
                <strong id="book-reader-title">{book.title}</strong>
                <span>{book.subtitle}</span>
              </div>
            </div>
            <button type="button" className="book-icon-button" onClick={onClose} aria-label="Close notes">
              <X size={20} />
            </button>
          </header>

          <div className="book-stage">
            <article className="book-page" key={pageIndex} aria-live="polite">
              <span className="book-page-kicker">DS LABORATORY · STUDY NOTES</span>
              <h2>{page.title}</h2>
              <div className="book-page-content">
                {page.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {page.bullets && (
                  <ul>
                    {page.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
                {page.code && <pre><code>{page.code}</code></pre>}
                {page.sources && (
                  <div className="book-sources">
                    <strong>Further reading</strong>
                    {page.sources.map((source) => (
                      <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                        {source.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <span className="book-page-number">{pageIndex + 1}</span>
            </article>
          </div>

          <footer className="book-reader-controls">
            <div className="book-page-controls">
              <button
                type="button"
                className="secondary-button small-button"
                onClick={() => setPageIndex((current) => Math.max(0, current - 1))}
                disabled={pageIndex === 0}
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <span aria-live="polite">Page {pageIndex + 1} of {book.pages.length}</span>
              <button
                type="button"
                className="primary-button small-button"
                onClick={() => setPageIndex((current) => Math.min(book.pages.length - 1, current + 1))}
                disabled={pageIndex === book.pages.length - 1}
              >
                Next <ArrowRight size={16} />
              </button>
            </div>
            <div className="book-export-controls">
              <button type="button" className="secondary-button small-button" onClick={handleDownload}>
                <Download size={16} /> Download notes
              </button>
              <button type="button" className="secondary-button small-button" onClick={() => window.print()}>
                <Printer size={16} /> Print / Save PDF
              </button>
            </div>
            <span className="book-keyboard-hint">Tip: use ← and → keys to turn pages; Esc to close.</span>
          </footer>
        </section>
      </div>
      <div className="book-print-content">
        <h1>{book.title}</h1>
        <p>{book.subtitle}</p>
        {book.pages.map((notePage, index) => (
          <article className="book-print-page" key={notePage.title}>
            <h2>{notePage.title}</h2>
            {notePage.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {notePage.bullets && <ul>{notePage.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            {notePage.code && <pre>{notePage.code}</pre>}
            {notePage.sources && (
              <p>Further reading: {notePage.sources.map((source) => source.url).join(' · ')}</p>
            )}
            <small>Page {index + 1}</small>
          </article>
        ))}
      </div>
    </>
  );
}

export default BookReader;

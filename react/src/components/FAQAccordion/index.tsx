/**
 * Render a list of FAQ items where clicking a question expands the answer.
 * Only one item can be open at a time.
 */

'use client';

import { useState } from 'react';
import FAQ from './components/FAQ';
import { FAQS } from './data';
import styles from '@/styles/FAQAccordion/faq-accordion.module.css';

const FAQAccordion: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number>(1);

  const handleUpdateFaq = (id: number) => {
    // taking the assumption that ids would be greater than or equal to 0
    setActiveFaq(prev => (prev === id ? -1 : id));
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>FAQs</h1>
      <div className={styles.faqs}>
        {FAQS.map(faq => (
          <FAQ key={faq.id} isOpen={activeFaq === faq.id} selectFaq={handleUpdateFaq} {...faq} />
        ))}
      </div>
    </section>
  );
};

export default FAQAccordion;

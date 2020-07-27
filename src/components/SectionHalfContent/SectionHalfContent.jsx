/** @jsx jsx */
import { jsx } from 'theme-ui';

import Section from '../Section';
import HalfContent from '../HalfContent';

const SectionHalfContent = ({ data = {}, noContainer = true, gray = false, left = false }) => {
  const { title, subtitle, text, items } = data;

  return (
    <Section title={title} subtitle={subtitle} text={text} noContainer={noContainer} gray={gray}>
      <HalfContent items={items || []} left={left} />
    </Section>
  );
};

export default SectionHalfContent;

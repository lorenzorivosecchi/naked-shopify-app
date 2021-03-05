interface SubmitProps {
  children?: string;
}

const Submit: React.FC<SubmitProps> = ({ children }) => (
  <input type="submit" value={children} />
);

export default Submit;

import Icon from './Icon';

export default function StateMessage({ title, message, action, compact = false }) {
  return (
    <div className={`state-message ${compact ? 'state-message--compact' : ''}`} role="status">
      <span className="state-message__icon"><Icon name="film" size={28} /></span>
      <h2>{title}</h2>
      <p>{message}</p>
      {action}
    </div>
  );
}

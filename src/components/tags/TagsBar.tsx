import { Tag } from '../ui/Tag';
import styles from './TagsBar.module.css';

interface TagsBarProps {
  tags: { label: string; value: string }[];
  onRemove: (value: string) => void;
  onClear?: () => void;
}

export const TagsBar = ({ tags, onRemove, onClear }: TagsBarProps) => {
  const hasTags = tags.length > 0;

  return (
    <div className={`${styles.tags} ${!hasTags ? styles['tags--hidden'] : ''}`}>
      <div className={styles.tags__list}>
        {hasTags &&
          tags.map((tag) => (
            <Tag key={tag.value} onRemove={() => onRemove(tag.value)}>
              {tag.label}
            </Tag>
          ))}
      </div>
      {hasTags && onClear && (
        <button className={styles.tags__clear} type="button" onClick={onClear}>
          Clear all
        </button>
      )}
    </div>
  );
};


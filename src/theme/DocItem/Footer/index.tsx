import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
  useDoc,
  type DocContextValue
  // @ts-ignore
} from '@docusaurus/theme-common/internal';
import LastUpdated from '@theme/LastUpdated';
import EditThisPage from '@theme/EditThisPage';
import TagsListInline, {
  type Props as TagsListInlineProps
} from '@theme/TagsListInline';

import styles from './styles.module.css';

function TagsRow(props: TagsListInlineProps) {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        'row margin-bottom--sm'
      )}
    >
      <div className="col">
        <TagsListInline {...props} />
      </div>
    </div>
  );
}

type EditMetaRowProps = Pick<
  DocContextValue['metadata'],
  'editUrl' | 'lastUpdatedAt' | 'lastUpdatedBy'
>;
function EditMetaRow({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy
}: EditMetaRowProps) {
  const date = new Date(lastUpdatedAt);
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, 'row')}>
      <div className="col">{editUrl && <EditThisPage editUrl={editUrl} />}</div>

      <div className={clsx('col', styles.lastUpdated)}>
        {(lastUpdatedAt || lastUpdatedBy) && (
          <LastUpdated
            lastUpdatedAt={date.getTime() / 1000}
            formattedLastUpdatedAt={`${date.getFullYear()}年${
              date.getMonth() + 1
            }月${date.getDate()}日`}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </div>
    </div>
  );
}

export default function DocItemFooter(): JSX.Element | null {
  const { metadata, frontMatter } = useDoc();
  const { editUrl, lastUpdatedBy, tags } = metadata;
  const { date, updated } = frontMatter;

  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || date || lastUpdatedBy);

  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

  if (!canDisplayFooter) {
    return null;
  }

  return (
    <footer
      className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}
    >
      {canDisplayTagsRow && <TagsRow tags={tags} />}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          editUrl={editUrl}
          lastUpdatedAt={updated || date}
          lastUpdatedBy={lastUpdatedBy}
        />
      )}
    </footer>
  );
}

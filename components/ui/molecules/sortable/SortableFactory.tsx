import {
  SortableContainer,
  SortableElement,
  SortableContainerProps
} from 'react-sortable-hoc';
import * as React from 'react';
import { Field } from 'react-final-form';
import { PictureField } from '../admin/blog/PictureField';

const SortableItem = SortableElement(props => (
  <Field
    name={`${props.name}`}
    key={props.name}
    render={({ input }) => (
      <PictureField
        fileId={input.value.file ? input.value.file._id : input.value}
        onRemoveField={() => props.removeCb(props.indexField)}
        text={`${props.indexField + 1} ${props.textItem || 'слайд'}`}
        withDrag={props.useDragHandle}
      />
    )}
  />
));

const SortableList = SortableContainer<Props>(
  ({ items, removeCb, textItem, useDragHandle }) => {
    return (
      <div>
        {items.map((name, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            name={name}
            removeCb={removeCb}
            indexField={index}
            textItem={textItem}
            useDragHandle={useDragHandle}
          />
        ))}
      </div>
    );
  }
);

type Props = {
  items: any;
  removeCb: (index: number) => void;
  textItem?: string;
} & SortableContainerProps;

export const SortableFactory = React.memo<Props>(props => {
  return <SortableList {...props} />;
});

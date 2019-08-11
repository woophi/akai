import {
  SortableContainer,
  SortableElement,
  SortableContainerProps
} from 'react-sortable-hoc';
import * as React from 'react';
import { Field } from 'react-final-form';
import { PictureField } from '../admin/blog/PictureField';
import { YoutubeField } from '../admin/youtube/YoutubeField';
import Box from '@material-ui/core/Box';

const SortableItem = SortableElement(props => (
  <Field
    name={`${props.name}`}
    key={props.name}
    render={({ input }) => (
      props.typeOfField === 'photo' ?
        <PictureField
          fileId={input.value.file ? input.value.file._id : input.value}
          onRemoveField={() => props.removeCb(props.indexField)}
          text={`${props.indexField + 1} ${props.textItem || 'слайд'}`}
          withDrag={props.useDragHandle}
        />
      :
        <YoutubeField
          videoId={input.value.videoId}
          onRemoveField={() => props.removeCb(props.indexField)}
          text={input.value.title}
          withDrag={props.useDragHandle}
        />
    )}
  />
));

const SortableList = SortableContainer<Props>(
  ({ items, removeCb, textItem, useDragHandle, typeOfField }) => {
    return (
      <Box>
        {items.map((name, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            name={name}
            removeCb={removeCb}
            indexField={index}
            textItem={textItem}
            useDragHandle={useDragHandle}
            typeOfField={typeOfField}
          />
        ))}
      </Box>
    );
  }
);

type Props = {
  items: any;
  removeCb: (index: number) => void;
  typeOfField: 'youtube' | 'photo';
  textItem?: string;
} & SortableContainerProps;

export const SortableFactory = React.memo<Props>(props => {
  return <SortableList {...props} />;
});

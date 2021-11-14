import { Accordion, AccordionDetails, AccordionSummary, ListItem, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { LocaleId } from 'core/models';
import * as React from 'react';
import { Field } from 'react-final-form';
import { SortableContainer, SortableContainerProps, SortableElement } from 'react-sortable-hoc';
import { TextField } from 'ui/atoms';
import { PictureField } from '../admin/blog/PictureField';
import { DragHandler } from './DragHandler';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ProductsChooser } from '../admin/shop/ProductsChooser';
import { ProductItemField } from '../admin/shop/ProductItemField';

type P = {
  removeCb: (index: number) => void;
  indexField: number;
  textItem?: string;
  useDragHandle: boolean;
  name: string;
  disabled: boolean;
};

const SortableItem = SortableElement((props: P) => (
  <Box key={props.name}>
    <ListItem>
      <DragHandler />
      {console.log(props.name)}
      <Field
        name={`${props.name}`}
        render={({ input }) => (
          <PictureField
            fileId={input.value.file ? input.value.file._id : input.value}
            onRemoveField={() => props.removeCb(props.indexField)}
            text={`${props.indexField + 1} ${props.textItem || 'слайд'}`}
            withDrag={false}
          />
        )}
      />
    </ListItem>
    <Box margin="0 1rem 1rem">
      <Accordion elevation={4}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Дополнительные параметры</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box padding="1rem">
            <Field
              name={`${props.name}.title.${LocaleId.Ru}`}
              render={({ input }) => (
                <TextField
                  {...input}
                  label={`Название на русском`}
                  variant="outlined"
                  margin="normal"
                  disabled={props.disabled}
                  fullWidth
                />
              )}
            />
            <Field
              name={`${props.name}.title.${LocaleId.En}`}
              render={({ input }) => (
                <TextField
                  {...input}
                  label={`Название на английском`}
                  variant="outlined"
                  margin="normal"
                  disabled={props.disabled}
                  fullWidth
                />
              )}
            />
            <Field
              name={`${props.name}.title.${LocaleId.Cs}`}
              render={({ input }) => (
                <TextField
                  {...input}
                  label={`Название на чешском`}
                  variant="outlined"
                  margin="normal"
                  disabled={props.disabled}
                  fullWidth
                />
              )}
            />
            <Field
              name={`${props.name}.subTitle.${LocaleId.Ru}`}
              render={({ input }) => (
                <TextField
                  {...input}
                  label={`Подзаголовок на русском`}
                  variant="outlined"
                  margin="normal"
                  disabled={props.disabled}
                  fullWidth
                />
              )}
            />
            <Field
              name={`${props.name}.subTitle.${LocaleId.En}`}
              render={({ input }) => (
                <TextField
                  {...input}
                  label={`Подзаголовок на английском`}
                  variant="outlined"
                  margin="normal"
                  disabled={props.disabled}
                  fullWidth
                />
              )}
            />
            <Field
              name={`${props.name}.subTitle.${LocaleId.Cs}`}
              render={({ input }) => (
                <TextField
                  {...input}
                  label={`Подзаголовок на чешском`}
                  variant="outlined"
                  margin="normal"
                  disabled={props.disabled}
                  fullWidth
                />
              )}
            />
            <Field
              name={`${props.name}.button.link`}
              render={({ input }) => (
                <>
                  <ProductsChooser label="Выбрать продукт для кнопки" subLabel="" onConfirm={input.onChange} single />
                  <ProductItemField input={input} onRemoveField={() => input.onChange(null)} />
                </>
              )}
            />
            <Field
              name={`${props.name}.button.name.${LocaleId.Ru}`}
              render={({ input }) => (
                <TextField
                  {...input}
                  label={`Название кнопки на русском`}
                  variant="outlined"
                  margin="normal"
                  disabled={props.disabled}
                  fullWidth
                />
              )}
            />
            <Field
              name={`${props.name}.button.name.${LocaleId.En}`}
              render={({ input }) => (
                <TextField
                  {...input}
                  label={`Название кнопки на английском`}
                  variant="outlined"
                  margin="normal"
                  disabled={props.disabled}
                  fullWidth
                />
              )}
            />
            <Field
              name={`${props.name}.button.name.${LocaleId.Cs}`}
              render={({ input }) => (
                <TextField
                  {...input}
                  label={`Название кнопки на чешском`}
                  variant="outlined"
                  margin="normal"
                  disabled={props.disabled}
                  fullWidth
                />
              )}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  </Box>
));

const SortableList = SortableContainer(({ items, removeCb, textItem, useDragHandle, disabled }: Props) => {
  return (
    <Box>
      {items.map((name, index) => (
        <SortableItem
          index={index}
          name={name}
          removeCb={removeCb}
          indexField={index}
          textItem={textItem}
          useDragHandle={!!useDragHandle}
          disabled={disabled}
        />
      ))}
    </Box>
  );
});

type Props = {
  items: {
    map: <R>(iterator: (name: string, index: number) => R) => R[];
  };
  removeCb: (index: number) => void;
  textItem?: string;
  disabled: boolean;
} & SortableContainerProps;

export const SortableSlider = React.memo<Props>(props => {
  return <SortableList {...props} />;
});

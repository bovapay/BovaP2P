import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { CloseOutlined } from '@ant-design/icons';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmModal({ onSubmit }: { onSubmit: () => void }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    await onSubmit();
    setOpen(false);
  };
  const handleBack = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        startIcon={<CloseOutlined />}
        variant="contained"
        color="secondary"
        sx={{
          textTransform: 'initial',
          background: '#F5F5F5',
          border: '1px solid #F5F5F5',
          color: 'var(--character-secondary, #8C8C8C)',
          ':hover': { background: '#e7e6e6' }
        }}
      >
        Отменить счет
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleBack}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Вы действительно хотите отменить счет?'}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleBack}>Назад</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

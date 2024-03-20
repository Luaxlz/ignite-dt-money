import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from '../../assets/Logo.svg';
import { NewTransactionModal } from '../NewTransactionModal';
import { useState } from 'react';

export function Header() {
  const [open, setOpen] = useState<boolean>(false);

  function closeModal() {
    setOpen(false);
  }
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt='' />

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal closeModal={closeModal} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}

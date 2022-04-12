import { useState } from 'react';
import { Group, ActionIcon, InputWrapper, Input, TextInput, Box, Text, Title, Button, Center, Checkbox, } from '@mantine/core';
import { useForm, formList } from '@mantine/form';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TrashX } from 'tabler-icons-react';
import { GripVertical } from 'tabler-icons-react';

export default function EmergencyContacts() {
    const form = useForm({
        initialValues: {
            email: '',
            phone: '',
            doctor: '',
            contacts: formList([
            ]),
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            phone: (value) => (/(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value) ? null : 'Invalid phone number'),
        },
    });

    const fields = form.values.contacts.map((_, index) => (
        <Group mt="xs" >
            <Center>
                <GripVertical size={18} />
            </Center>
            <TextInput
                placeholder="John Doe"
                {...form.getListInputProps('contacts', index, 'name')}
            />
            <TextInput
                placeholder="(123) 456-7890"
                {...form.getListInputProps('contacts', index, 'phone')}
            />
            <ActionIcon onClick={() => form.removeListItem('contacts', index)}>
                <TrashX />
            </ActionIcon>
        </Group>
    ));

    return (
        <Box sx={{ maxWidth: 500 }} mx="auto" style={{ textAlign: 'center' }}>
            <Title order={2} style={{ margin: 10 }}>Email Address</Title>
            <TextInput
                required
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
            />
            <Title order={2} style={{ margin: 10 }}>Phone number</Title>
            <TextInput
                required
                label="Phone Number"
                placeholder="(123) 456-7890"
                {...form.getInputProps('phone')}
            />
            <Title order={2} style={{ margin: 10 }}>Doctor</Title>
            <TextInput
                required
                disabled
                label="Phone Number"
                placeholder="(123) 456-7890"
                {...form.getInputProps('phone')}
            />
            <Title order={4} style={{ margin: 10 }}>Emergency Contacts:</Title>



            <Box sx={{ maxWidth: 500 }} mx="auto">
                {fields.length > 0 ? (
                    <Group mb="xs">
                        <Text weight={500} size="sm" sx={{ flex: 1 }}>
                            Name
                        </Text>
                        <Text weight={500} size="sm" pr={90}>
                            Phone Number
                        </Text>
                    </Group>
                ) : (
                    <Text color="dimmed" align="center">
                        No one here...
                    </Text>
                )}

                <DragDropContext
                    onDragEnd={({ destination, source }) =>
                        form.reorderListItem('contacts', { from: source.index, to: destination.index })
                    }
                >
                    <Droppable droppableId="dnd-list" direction="vertical">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {fields}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <Group position="center" mt="md">
                    <Button onClick={() => form.addListItem('contacts', { name: '', email: '' })}>
                        Add Contact
                    </Button>
                </Group>
            </Box>
            <Group position="right" mt="md">
                <Button type="submit">Save</Button>
            </Group>
        </Box>
    );
}
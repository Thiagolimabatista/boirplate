import type { UniqueIdentifier } from '@dnd-kit/core';
import type { IKanban, IKanbanTask, IKanbanColumn } from 'src/types/kanban';

import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

const enableServer = false;

const KANBAN_ENDPOINT = endpoints.kanban;

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------

type BoardData = {
  board: IKanban;
};

// Dados hardcoded em português
const MOCK_BOARD: IKanban = {
  columns: [
    { id: 'column-1', name: 'A fazer' },
    { id: 'column-2', name: 'Em progresso' },
    { id: 'column-3', name: 'Pronto para testar' },
    { id: 'column-4', name: 'Concluído' },
  ],
  tasks: {
    'column-1': [
      {
        id: 'task-1',
        name: 'Implementar nova funcionalidade',
        status: 'A fazer',
        priority: 'high',
        labels: ['Desenvolvimento', 'Urgente'],
        description: 'Criar nova funcionalidade de relatórios para o painel administrativo',
        attachments: [],
        comments: [],
        assignee: [
          {
            id: _mock.id(1),
            name: _mock.fullName(1),
            role: 'Desenvolvedor',
            email: _mock.email(1),
            status: 'online',
            address: _mock.fullAddress(1),
            avatarUrl: _mock.image.avatar(1),
            phoneNumber: _mock.phoneNumber(1),
            lastActivity: new Date().toISOString(),
          },
        ],
        due: [null, null],
        reporter: {
          id: _mock.id(2),
          name: _mock.fullName(2),
          avatarUrl: _mock.image.avatar(2),
        },
      },
    ],
    'column-2': [
      {
        id: 'task-2',
        name: 'Revisar código do módulo de usuários',
        status: 'Em progresso',
        priority: 'medium',
        labels: ['Revisão', 'Backend'],
        description: 'Revisar e otimizar código do módulo de gestão de usuários',
        attachments: [],
        comments: [],
        assignee: [
          {
            id: _mock.id(3),
            name: _mock.fullName(3),
            role: 'Desenvolvedor Senior',
            email: _mock.email(3),
            status: 'online',
            address: _mock.fullAddress(3),
            avatarUrl: _mock.image.avatar(3),
            phoneNumber: _mock.phoneNumber(3),
            lastActivity: new Date().toISOString(),
          },
        ],
        due: [null, null],
        reporter: {
          id: _mock.id(4),
          name: _mock.fullName(4),
          avatarUrl: _mock.image.avatar(4),
        },
      },
    ],
    'column-3': [
      {
        id: 'task-3',
        name: 'Testes de integração API',
        status: 'Pronto para testar',
        priority: 'medium',
        labels: ['Testes', 'QA'],
        description: 'Executar testes de integração da API REST',
        attachments: [],
        comments: [],
        assignee: [
          {
            id: _mock.id(5),
            name: _mock.fullName(5),
            role: 'QA Engineer',
            email: _mock.email(5),
            status: 'online',
            address: _mock.fullAddress(5),
            avatarUrl: _mock.image.avatar(5),
            phoneNumber: _mock.phoneNumber(5),
            lastActivity: new Date().toISOString(),
          },
        ],
        due: [null, null],
        reporter: {
          id: _mock.id(6),
          name: _mock.fullName(6),
          avatarUrl: _mock.image.avatar(6),
        },
      },
    ],
    'column-4': [
      {
        id: 'task-4',
        name: 'Atualizar documentação do projeto',
        status: 'Concluído',
        priority: 'low',
        labels: ['Documentação'],
        description: 'Atualizar README e documentação técnica',
        attachments: [],
        comments: [],
        assignee: [
          {
            id: _mock.id(7),
            name: _mock.fullName(7),
            role: 'Tech Writer',
            email: _mock.email(7),
            status: 'offline',
            address: _mock.fullAddress(7),
            avatarUrl: _mock.image.avatar(7),
            phoneNumber: _mock.phoneNumber(7),
            lastActivity: new Date().toISOString(),
          },
        ],
        due: [null, null],
        reporter: {
          id: _mock.id(8),
          name: _mock.fullName(8),
          avatarUrl: _mock.image.avatar(8),
        },
      },
    ],
  },
};

export function useGetBoard() {
  const { data, isLoading, error, isValidating } = useSWR<BoardData>(
    KANBAN_ENDPOINT,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(() => {
    // Usando dados mockados em vez da API
    const {tasks} = MOCK_BOARD;
    const {columns} = MOCK_BOARD;

    return {
      board: { tasks, columns },
      boardLoading: false,
      boardError: error,
      boardValidating: false,
      boardEmpty: false,
    };
  }, [error]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createColumn(columnData: IKanbanColumn) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnData };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'create-column' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData as BoardData;

      // add new column in board.columns
      const columns = [...board.columns, columnData];

      // add new task in board.tasks
      const tasks = { ...board.tasks, [columnData.id]: [] };

      return { ...currentData, board: { ...board, columns, tasks } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateColumn(columnId: UniqueIdentifier, columnName: string) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnId, columnName };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'update-column' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData as BoardData;

      const columns = board.columns.map((column) =>
        column.id === columnId
          ? {
              // Update data when found
              ...column,
              name: columnName,
            }
          : column
      );

      return { ...currentData, board: { ...board, columns } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function moveColumn(updateColumns: IKanbanColumn[]) {
  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData as BoardData;

      return { ...currentData, board: { ...board, columns: updateColumns } };
    },
    false
  );

  /**
   * Work on server
   */
  if (enableServer) {
    const data = { updateColumns };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'move-column' } });
  }
}

// ----------------------------------------------------------------------

export async function clearColumn(columnId: UniqueIdentifier) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnId };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'clear-column' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData as BoardData;

      // remove all tasks in column
      const tasks = { ...board.tasks, [columnId]: [] };

      return { ...currentData, board: { ...board, tasks } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function deleteColumn(columnId: UniqueIdentifier) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnId };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'delete-column' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData as BoardData;

      // delete column in board.columns
      const columns = board.columns.filter((column) => column.id !== columnId);

      // delete tasks by column deleted
      const tasks = Object.keys(board.tasks)
        .filter((key) => key !== columnId)
        .reduce((obj: IKanban['tasks'], key) => {
          obj[key] = board.tasks[key];
          return obj;
        }, {});

      return { ...currentData, board: { ...board, columns, tasks } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function createTask(columnId: UniqueIdentifier, taskData: IKanbanTask) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnId, taskData };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'create-task' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData as BoardData;

      // add task in board.tasks
      const tasks = { ...board.tasks, [columnId]: [taskData, ...board.tasks[columnId]] };

      return { ...currentData, board: { ...board, tasks } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateTask(columnId: UniqueIdentifier, taskData: IKanbanTask) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnId, taskData };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'update-task' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData as BoardData;

      // tasks in column
      const tasksInColumn = board.tasks[columnId];

      // find and update task
      const updateTasks = tasksInColumn.map((task) =>
        task.id === taskData.id
          ? {
              // Update data when found
              ...task,
              ...taskData,
            }
          : task
      );

      const tasks = { ...board.tasks, [columnId]: updateTasks };

      return { ...currentData, board: { ...board, tasks } };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function moveTask(updateTasks: IKanban['tasks']) {
  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData as BoardData;

      // update board.tasks
      const tasks = updateTasks;

      return { ...currentData, board: { ...board, tasks } };
    },
    false
  );

  /**
   * Work on server
   */
  if (enableServer) {
    const data = { updateTasks };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'move-task' } });
  }
}

// ----------------------------------------------------------------------

export async function deleteTask(columnId: UniqueIdentifier, taskId: UniqueIdentifier) {
  /**
   * Work on server
   */
  if (enableServer) {
    const data = { columnId, taskId };
    await axios.post(KANBAN_ENDPOINT, data, { params: { endpoint: 'delete-task' } });
  }

  /**
   * Work in local
   */
  mutate(
    KANBAN_ENDPOINT,
    (currentData) => {
      const { board } = currentData as BoardData;

      // delete task in column
      const tasks = {
        ...board.tasks,
        [columnId]: board.tasks[columnId].filter((task) => task.id !== taskId),
      };

      return { ...currentData, board: { ...board, tasks } };
    },
    false
  );
}

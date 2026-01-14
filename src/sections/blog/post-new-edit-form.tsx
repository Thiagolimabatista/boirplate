import type { IPostItem } from 'src/types/blog';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { _tags, USER_DEPARTMENT_OPTIONS } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { PostDetailsPreview } from './post-details-preview';

// ----------------------------------------------------------------------

export type NewPostSchemaType = zod.infer<typeof NewPostSchema>;

export const NewPostSchema = zod.object({
  title: zod.string().min(1, { message: 'Título é obrigatório!' }),
  description: zod.string().min(1, { message: 'Descrição é obrigatória!' }),
  content: schemaHelper.editor().min(100, { message: 'Conteúdo deve ter pelo menos 100 caracteres' }),
  coverUrl: schemaHelper.file({ message: { required_error: 'Imagem de capa é obrigatória!' } }),
  tags: zod.string().array().min(2, { message: 'Deve ter pelo menos 2 tags!' }),
  metaKeywords: zod.string().array().nonempty({ message: 'Palavras-chave são obrigatórias!' }),
  // Agendamento
  scheduleEnabled: zod.boolean(),
  scheduleDate: zod.string().optional(),
  scheduleTime: zod.string().optional(),
  // Público-alvo
  targetAllDepartments: zod.boolean(),
  targetDepartments: zod.string().array(),
  // Not required
  metaTitle: zod.string(),
  metaDescription: zod.string(),
});

// ----------------------------------------------------------------------

type Props = {
  currentPost?: IPostItem;
};

export function PostNewEditForm({ currentPost }: Props) {
  const router = useRouter();

  const preview = useBoolean();

  const defaultValues = useMemo(
    () => ({
      title: currentPost?.title || '',
      description: currentPost?.description || '',
      content: currentPost?.content || '',
      coverUrl: currentPost?.coverUrl || null,
      tags: currentPost?.tags || [],
      metaKeywords: currentPost?.metaKeywords || [],
      metaTitle: currentPost?.metaTitle || '',
      metaDescription: currentPost?.metaDescription || '',
      scheduleEnabled: false,
      scheduleDate: '',
      scheduleTime: '',
      targetAllDepartments: true,
      targetDepartments: [],
    }),
    [currentPost]
  );

  const methods = useForm<NewPostSchemaType>({
    mode: 'all',
    resolver: zodResolver(NewPostSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues);
    }
  }, [currentPost, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      preview.onFalse();
      toast.success(currentPost ? 'Atualizado com sucesso!' : 'Criado com sucesso!');
      router.push(paths.dashboard.post.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(() => {
    setValue('coverUrl', null);
  }, [setValue]);

  const renderDetails = (
    <Card>
      <CardHeader title="Detalhes" subheader="Título, descrição, imagem..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="title" label="Título da publicação" />

        <Field.Text name="description" label="Descrição" multiline rows={3} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Conteúdo</Typography>
          <Field.Editor name="content" sx={{ maxHeight: 480 }} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Imagem de Capa</Typography>
          <Field.Upload name="coverUrl" maxSize={3145728} onDelete={handleRemoveFile} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderSchedule = (
    <Card>
      <CardHeader
        title="Agendamento de Disparo"
        subheader="Configure quando a publicação será enviada no WhatsApp"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={values.scheduleEnabled}
                onChange={(e) => setValue('scheduleEnabled', e.target.checked)}
              />
            }
            label="Agendar publicação"
          />
          <FormHelperText sx={{ mx: 0 }}>
            Ative para escolher data e hora específica de envio
          </FormHelperText>
        </Box>

        {values.scheduleEnabled && (
          <Stack spacing={2}>
            <Field.Text
              name="scheduleDate"
              label="Data de envio"
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: new Date().toISOString().split('T')[0] }}
            />

            <Field.Text
              name="scheduleTime"
              label="Horário de envio"
              type="time"
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        )}
      </Stack>
    </Card>
  );

  const renderTargetAudience = (
    <Card>
      <CardHeader
        title="Público-Alvo"
        subheader="Defina quem receberá esta publicação"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={values.targetAllDepartments}
                onChange={(e) => setValue('targetAllDepartments', e.target.checked)}
              />
            }
            label="Enviar para todos os departamentos"
          />
          <FormHelperText sx={{ mx: 0 }}>
            Desative para selecionar departamentos específicos
          </FormHelperText>
        </Box>

        {!values.targetAllDepartments && (
          <Field.Autocomplete
            name="targetDepartments"
            label="Departamentos"
            placeholder="Selecione os departamentos"
            multiple
            disableCloseOnSelect
            options={USER_DEPARTMENT_OPTIONS}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
            renderTags={(selected, getTagProps) =>
              selected.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  size="small"
                  color="primary"
                  variant="soft"
                />
              ))
            }
          />
        )}
      </Stack>
    </Card>
  );

  const renderProperties = (
    <Card>
      <CardHeader
        title="Propriedades"
        subheader="Funções e atributos adicionais..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Autocomplete
          name="tags"
          label="Tags"
          placeholder="+ Tags"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags.map((option) => option)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />

        <Field.Text name="metaTitle" label="Meta título" />

        <Field.Text name="metaDescription" label="Meta descrição" fullWidth multiline rows={3} />

        <Field.Autocomplete
          name="metaKeywords"
          label="Palavras-chave"
          placeholder="+ Palavras-chave"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags.map((option) => option)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />

        <FormControlLabel
          control={<Switch defaultChecked inputProps={{ id: 'comments-switch' }} />}
          label="Habilitar comentários"
        />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="flex-end">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        label="Publicar"
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <div>
        <Button color="inherit" variant="outlined" size="large" onClick={preview.onTrue}>
          Pré-visualizar
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPost ? 'Criar publicação' : 'Salvar alterações'}
        </LoadingButton>
      </div>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}

        {renderSchedule}

        {renderTargetAudience}

        {renderProperties}

        {renderActions}
      </Stack>

      <PostDetailsPreview
        isValid={isValid}
        onSubmit={onSubmit}
        title={values.title}
        open={preview.value}
        content={values.content}
        onClose={preview.onFalse}
        coverUrl={values.coverUrl}
        isSubmitting={isSubmitting}
        description={values.description}
      />
    </Form>
  );
}

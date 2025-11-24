import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useApp } from '../context/AppContext';

function MuiTechnologyCard({ technology, onStatusChange, onNotesChange, onDelete }) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [localNotes, setLocalNotes] = useState(technology.notes || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { showNotification } = useApp();

  const handleStatusChange = () => {
    const nextStatus = {
      'not-started': 'in-progress',
      'in-progress': 'completed',
      'completed': 'not-started'
    }[technology.status];
    
    onStatusChange(technology.id, nextStatus);
    showNotification(`Статус "${technology.title}" изменен на "${getStatusText(nextStatus)}"`, 'success');
  };

  const handleNotesSave = () => {
    onNotesChange(technology.id, localNotes);
    setIsEditingNotes(false);
    showNotification('Заметка сохранена', 'success');
  };

  const handleNotesCancel = () => {
    setLocalNotes(technology.notes || '');
    setIsEditingNotes(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(technology.id);
    setShowDeleteConfirm(false);
    showNotification(`Технология "${technology.title}" удалена`, 'success');
  };

  const getStatusIcon = () => {
    switch (technology.status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'not-started': return '⏳';
      default: return '📝';
    }
  };

  const getStatusText = (status = technology.status) => {
    switch (status) {
      case 'completed': return 'Изучено';
      case 'in-progress': return 'В процессе';
      case 'not-started': return 'Не начато';
      default: return 'Не определено';
    }
  };

  const getStatusClass = () => {
    switch (technology.status) {
      case 'completed': return 'completed';
      case 'in-progress': return 'in-progress';
      case 'not-started': return 'not-started';
      default: return '';
    }
  };

  return (
    <>
      <Card 
        className={`technology-card ${getStatusClass()}`}
        onClick={handleStatusChange}
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent sx={{ flexGrow: 1, cursor: 'pointer', p: 2 }}>
          {/* Заголовок и статус */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="h3" sx={{ 
                fontWeight: 600, 
                mb: 0.5, 
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}>
                {technology.isFromApi && '🐰 '}
                {technology.title}
              </Typography>
              {technology.isFromApi && (
                <Chip
                  label="PokéAPI"
                  size="small"
                  color="secondary"
                  sx={{ fontSize: '0.6rem', height: 20 }}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={`${getStatusIcon()} ${getStatusText()}`}
                size="small"
                sx={{ 
                  fontWeight: 500,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'inherit'
                }}
              />
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(true);
                }}
                sx={{ 
                  color: 'error.main',
                  '&:hover': { backgroundColor: 'error.light', color: 'white' }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Спрайт покемона если есть */}
          {technology.pokemonData?.sprite && (
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <img 
                src={technology.pokemonData.sprite} 
                alt={technology.title}
                style={{ 
                  width: '80px', 
                  height: '80px',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  padding: '4px'
                }}
              />
            </Box>
          )}

          {/* Описание */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, lineHeight: 1.6, minHeight: '60px' }}
          >
            {technology.description}
          </Typography>

          {/* Дополнительная информация для покемонов */}
          {technology.isFromApi && technology.pokemonData && (
            <Box sx={{ 
              backgroundColor: 'background.default',
              borderRadius: 1,
              p: 1.5,
              mb: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Тип:</Typography>
                <Typography variant="caption" fontWeight="600">
                  {technology.pokemonData.types.join(', ')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Рост:</Typography>
                <Typography variant="caption" fontWeight="600">
                  {technology.pokemonData.height} м
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">Вес:</Typography>
                <Typography variant="caption" fontWeight="600">
                  {technology.pokemonData.weight} кг
                </Typography>
              </Box>
            </Box>
          )}
          
          {/* Заметки */}
          <Box onClick={(e) => e.stopPropagation()}>
            <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
              📝 Мои заметки:
            </Typography>
            
            {isEditingNotes ? (
              <Box sx={{ mb: 2 }}>
                <TextField
                  multiline
                  rows={3}
                  value={localNotes}
                  onChange={(e) => setLocalNotes(e.target.value)}
                  placeholder="Записывайте сюда важные моменты..."
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    startIcon={<SaveIcon />}
                    onClick={handleNotesSave}
                    variant="contained"
                    size="small"
                    color="primary"
                  >
                    Сохранить
                  </Button>
                  <Button
                    startIcon={<CancelIcon />}
                    onClick={handleNotesCancel}
                    variant="outlined"
                    size="small"
                  >
                    Отмена
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box 
                onClick={() => setIsEditingNotes(true)}
                sx={{ 
                  cursor: 'pointer',
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: technology.notes ? 'action.hover' : 'transparent',
                  border: technology.notes ? 'none' : '1px dashed',
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  minHeight: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: technology.notes ? 'flex-start' : 'center'
                }}
              >
                {technology.notes ? (
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.primary' }}>
                    {technology.notes}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                    Нажмите, чтобы добавить заметку...
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  {technology.notes 
                    ? `Заметка сохранена (${technology.notes.length} символов)` 
                    : 'Добавьте заметку'
                  }
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>

        <Box sx={{ textAlign: 'center', p: 2, pt: 0, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="caption" color="text.secondary">
            Кликни для смены статуса
          </Typography>
        </Box>
      </Card>

      {/* Диалог подтверждения удаления */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <Typography>
            Вы уверены, что хотите удалить технологию "{technology.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)}>
            Отмена
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MuiTechnologyCard;
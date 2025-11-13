import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from 'react-native';
import {Colors, Theme} from '@constants';

interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange: (date: Date) => void;
  error?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  minimumDate,
  maximumDate,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDateChange = (years: number) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(selectedDate.getFullYear() + years);
    if (minimumDate && newDate < minimumDate) return;
    if (maximumDate && newDate > maximumDate) return;
    setSelectedDate(newDate);
  };

  const handleMonthChange = (months: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + months);
    if (minimumDate && newDate < minimumDate) return;
    if (maximumDate && newDate > maximumDate) return;
    setSelectedDate(newDate);
  };

  const handleDayChange = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    if (minimumDate && newDate < minimumDate) return;
    if (maximumDate && newDate > maximumDate) return;
    setSelectedDate(newDate);
  };

  const handleConfirm = () => {
    onChange(selectedDate);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.input, error && styles.inputError]}
        onPress={() => setShowPicker(true)}>
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value ? formatDate(value) : 'Select date of birth'}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date of Birth</Text>

            <View style={styles.pickerContainer}>
              <View style={styles.pickerColumn}>
                <TouchableOpacity
                  onPress={() => handleMonthChange(-1)}
                  style={styles.pickerButton}>
                  <Text style={styles.pickerButtonText}>▲</Text>
                </TouchableOpacity>
                <Text style={styles.pickerValue}>
                  {selectedDate.toLocaleString('en-US', {month: 'short'})}
                </Text>
                <TouchableOpacity
                  onPress={() => handleMonthChange(1)}
                  style={styles.pickerButton}>
                  <Text style={styles.pickerButtonText}>▼</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.pickerColumn}>
                <TouchableOpacity
                  onPress={() => handleDayChange(-1)}
                  style={styles.pickerButton}>
                  <Text style={styles.pickerButtonText}>▲</Text>
                </TouchableOpacity>
                <Text style={styles.pickerValue}>{selectedDate.getDate()}</Text>
                <TouchableOpacity
                  onPress={() => handleDayChange(1)}
                  style={styles.pickerButton}>
                  <Text style={styles.pickerButtonText}>▼</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.pickerColumn}>
                <TouchableOpacity
                  onPress={() => handleDateChange(-1)}
                  style={styles.pickerButton}>
                  <Text style={styles.pickerButtonText}>▲</Text>
                </TouchableOpacity>
                <Text style={styles.pickerValue}>
                  {selectedDate.getFullYear()}
                </Text>
                <TouchableOpacity
                  onPress={() => handleDateChange(1)}
                  style={styles.pickerButton}>
                  <Text style={styles.pickerButtonText}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setShowPicker(false)}
                style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirm}
                style={[styles.modalButton, styles.confirmButton]}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.medium,
    color: Colors.text,
    marginBottom: Theme.spacing.xs,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    minHeight: 50,
    justifyContent: 'center',
  },
  inputError: {
    borderColor: Colors.error,
  },
  text: {
    fontSize: Theme.fontSize.md,
    color: Colors.text,
  },
  placeholder: {
    color: Colors.textLight,
  },
  errorText: {
    color: Colors.error,
    fontSize: Theme.fontSize.xs,
    marginTop: Theme.spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: Theme.borderRadius.xl,
    borderTopRightRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xxl,
  },
  modalTitle: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text,
    marginBottom: Theme.spacing.xl,
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Theme.spacing.xl,
  },
  pickerColumn: {
    alignItems: 'center',
  },
  pickerButton: {
    padding: Theme.spacing.sm,
  },
  pickerButtonText: {
    fontSize: Theme.fontSize.xl,
    color: Colors.primary,
  },
  pickerValue: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Colors.text,
    marginVertical: Theme.spacing.md,
    minWidth: 60,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  cancelButtonText: {
    color: Colors.text,
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
  },
  confirmButtonText: {
    color: Colors.textInverse,
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
  },
});

export default DatePicker;

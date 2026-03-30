import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, TextInput,
    TouchableOpacity, ActivityIndicator, Alert, Modal, FlatList,
} from 'react-native';
import axios from 'axios';
import { API_BASE } from '../config';
import { getToken } from '../auth';

interface Game { id: string; name: string; }
interface PaymentMethod { id: string; name: string; paymentTag: string | null; }

export default function TopUpScreen() {
    const [games, setGames] = useState<Game[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showGamePicker, setShowGamePicker] = useState(false);
    const [showMethodPicker, setShowMethodPicker] = useState(false);

    useEffect(() => {
        Promise.all([
            axios.get<Game[]>(`${API_BASE}/games`),
            axios.get<PaymentMethod[]>(`${API_BASE}/payment-methods`),
        ]).then(([gamesRes, methodsRes]) => {
            setGames(gamesRes.data);
            setPaymentMethods(methodsRes.data);
            if (gamesRes.data.length > 0) setSelectedGame(gamesRes.data[0]);
            if (methodsRes.data.length > 0) setSelectedMethod(methodsRes.data[0]);
        }).catch(() => {
            Alert.alert('Error', 'Failed to load data. Please try again.');
        }).finally(() => setLoading(false));
    }, []);

    const handleSubmit = async () => {
        const token = await getToken();
        if (!token) {
            Alert.alert('Not Logged In', 'Please log in to submit a top-up request.');
            return;
        }
        if (!selectedGame || !selectedMethod) {
            Alert.alert('Missing Info', 'Please select a game and payment method.');
            return;
        }
        const parsedAmount = parseFloat(amount);
        if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid amount.');
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(
                `${API_BASE}/orders/topup`,
                { gameId: selectedGame.id, paymentMethodId: selectedMethod.id, amount: parsedAmount },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            Alert.alert('Success', 'Top-up request submitted! An agent will process it shortly.');
            setAmount('');
        } catch (err: unknown) {
            const axiosErr = err as { response?: { data?: { message?: string } } };
            Alert.alert('Error', axiosErr.response?.data?.message || 'Failed to submit request.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#2563eb" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Request Top-Up</Text>

                <Text style={styles.label}>Select Game</Text>
                <TouchableOpacity style={styles.dropdown} onPress={() => setShowGamePicker(true)}>
                    <Text style={styles.dropdownText}>{selectedGame?.name || 'Select a game'}</Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Select Payment Method</Text>
                <TouchableOpacity style={styles.dropdown} onPress={() => setShowMethodPicker(true)}>
                    <Text style={styles.dropdownText}>
                        {selectedMethod ? `${selectedMethod.name}${selectedMethod.paymentTag ? ` (${selectedMethod.paymentTag})` : ''}` : 'Select a method'}
                    </Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Amount ($)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="e.g. 50"
                    value={amount}
                    onChangeText={setAmount}
                />

                <TouchableOpacity
                    style={[styles.button, submitting && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={submitting}
                >
                    {submitting
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.buttonText}>Submit Top-Up Request</Text>
                    }
                </TouchableOpacity>
            </View>

            {/* Game Picker Modal */}
            <Modal visible={showGamePicker} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Game</Text>
                        <FlatList
                            data={games}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => { setSelectedGame(item); setShowGamePicker(false); }}
                                >
                                    <Text style={[styles.modalItemText, selectedGame?.id === item.id && styles.selectedText]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.modalCancel} onPress={() => setShowGamePicker(false)}>
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Payment Method Picker Modal */}
            <Modal visible={showMethodPicker} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Payment Method</Text>
                        <FlatList
                            data={paymentMethods}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => { setSelectedMethod(item); setShowMethodPicker(false); }}
                                >
                                    <Text style={[styles.modalItemText, selectedMethod?.id === item.id && styles.selectedText]}>
                                        {item.name}{item.paymentTag ? ` — ${item.paymentTag}` : ''}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.modalCancel} onPress={() => setShowMethodPicker(false)}>
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 12, color: '#64748b' },
    content: { padding: 24, paddingTop: 40 },
    header: { fontSize: 24, fontWeight: '700', color: '#1e293b', marginBottom: 24 },
    label: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 8, marginTop: 16 },
    dropdown: { backgroundColor: '#fff', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    dropdownText: { color: '#0f172a', fontSize: 16 },
    chevron: { color: '#94a3b8', fontSize: 20 },
    input: { backgroundColor: '#fff', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', fontSize: 16 },
    button: { backgroundColor: '#2563eb', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 32 },
    buttonDisabled: { opacity: 0.6 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, maxHeight: '70%' },
    modalTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b', marginBottom: 16 },
    modalItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    modalItemText: { fontSize: 16, color: '#334155' },
    selectedText: { color: '#2563eb', fontWeight: '700' },
    modalCancel: { marginTop: 12, padding: 14, alignItems: 'center' },
    modalCancelText: { color: '#ef4444', fontWeight: '600', fontSize: 16 },
});

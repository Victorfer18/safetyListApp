import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';

const RefreshableScrollView = ({ onRefresh, children }) => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await onRefresh();
        } catch (error) {
            console.error('Erro ao atualizar:', error);
        }
        setRefreshing(false);
    }, [onRefresh]);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        >
            {children}
        </ScrollView>
    );
};

export default RefreshableScrollView;
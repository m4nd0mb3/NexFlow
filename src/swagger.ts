import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NexFlow',
            version: '1.0.0',
            description: 'Bem-vindo ao repositório oficial do NexFlow API Gateway – uma solução moderna e escalável para gerenciamento eficiente de APIs. O NexFlow atua como um hub central, conectando e facilitando a comunicação entre diferentes serviços e aplicativos. Esta plataforma oferece recursos avançados, incluindo roteamento inteligente, controle de acesso, transformação de dados e métricas detalhadas para otimizar o ciclo de vida das APIs.',
        },
    },
    apis: ['./controllers/*.ts', './src/controllers/*.ts'], // Adapte o caminho para incluir seus controladores
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

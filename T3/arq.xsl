<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes" />
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <title>Arqueossítios do Noroeste Português</title>
                </head>
                <body>
                    <h2>Arqueossítios do Noroeste Português</h2>
                    <h3>Índice de Arqueossítios</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI" lang="pt"/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
        
    </xsl:template>
    
    <!-- Templates de índice ............................................................ -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html"> <!-- para a pag do doc que vamos gerar -->
                <xsl:value-of select="IDENTI"/><!-- nos mesmos nodos para a bookmark e para o link. neste caso no doc -->
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates para o conteúdo ............................................................ -->
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <p><b>Tipo: </b> <xsl:value-of select="TIPO/@ASSUNTO"/></p>
                    <p><b>Imagem: </b> <xsl:value-of select="IMAGEM/@NOME"/></p>
                    <p><b>Descrição: </b> <xsl:value-of select="CRONO"/></p>
                    <p><b>Lugar: </b> <xsl:value-of select="LUGAR"/></p>
                    <p><b>Frequência: </b> <xsl:value-of select="FREQ"/></p>
                    <p><b>Concelho: </b> <xsl:value-of select="CONCEl"/></p>
                    <p><b>Codadm: </b> <xsl:value-of select="CODADM"/></p>
                    <p><b>Latitute: </b> <xsl:value-of select="LATITU"/></p>
                    <p><b>Longitude: </b> <xsl:value-of select="LONGIT"/></p>
                    <p><b>Altitude: </b> <xsl:value-of select="ALTITU"/></p>
                    <p><b>Acesso: </b> <xsl:value-of select="ACESSO"/></p>
                    <p><b>Quadro: </b> <xsl:value-of select="QUADRO"/></p>
                    <p><b>Descoberta arqueológica: </b> <xsl:value-of select="DESARQ"/></p>
                    <p><b>Interp: </b> <xsl:value-of select="INTERP"/></p>
                    <p><b>Depósito: </b> <xsl:value-of select="DEPOSI"/></p>
                    <p><b>Bibliografia: </b>
                        <ol><xsl:for-each select="BIBLIO">
                            <li><xsl:value-of select="."/></li>
                            </xsl:for-each>
                        </ol>
                    </p>
                    <p><b>Autor: </b> <xsl:value-of select="AUTOR"/></p>
                    <p><b>Trabalhos Arqueológicos: </b> <xsl:value-of select="TRAARQ"/></p>
                    <p><b>Data: </b> <xsl:value-of select="DATA"/></p>
                    
                    <address>
                        [<a href="index.html#{generate-id()}">Voltar à pagina principal</a>]
                    </address>
                </body>
            </html>
            
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="BIBLIO" mode="biblio">
            <li><xsl:value-of select="."/></li>
        
    </xsl:template>
    
</xsl:stylesheet>
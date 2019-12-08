<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
            
                <table id="menuTable" class="indent">
                    <thead>
                        <tr style="color: #fff; background: #2c3e50;">
                            <th>Select</th>
                            <th>Item</th>
                            <th>Price per Item (€)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="/cafemenu/section">
                            <tr style="color: #fff; background-color:#1abc9c">
                                <td colspan="3">
                                    <b>
                                    <xsl:value-of select="@name" />
                                    </b>
                                </td>
                            </tr>
                            <xsl:for-each select="entree">
                                <tr id="{position()}">
                                    <xsl:attribute name="vegetarian">
                                        <xsl:value-of select="boolean(./@vegetarian)" />
                                    </xsl:attribute>
                                    <td align="center">
                                        <input name="item0" type="checkbox" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="item" />
                                    </td>
                                    <td align="right">
                                        <xsl:value-of select="price" />
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </tbody>
                </table><br/>
    </xsl:template>
</xsl:stylesheet>
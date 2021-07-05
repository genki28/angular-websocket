package main

import (
	"fmt"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"golang.org/x/net/websocket"
)

func handleWebSocket(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()

		// 初回のメッセージ送信
		err := websocket.Message.Send(ws, "Server, OK WebSocket")
		if err != nil {
			c.Logger().Error(err)
		}

		for {
			// clientからのメッセージを読み込む処理
			msg := ""
			err = websocket.Message.Receive(ws, &msg)
			if err != nil {
				c.Logger().Error(err)
			}

			// clientからのメッセージを元にメッセージを返す
			err = websocket.Message.Send(ws, fmt.Sprintf("Server: \"%s\" received!", msg))

			if err != nil {
				c.Logger().Error(err)
			}
		}
	}).ServeHTTP(c.Response(), c.Request())
	return nil
}

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.GET("/ws", handleWebSocket)
	e.Logger.Fatal(e.Start(":8080"))
}